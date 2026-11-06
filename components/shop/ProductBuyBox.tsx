'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import Button from '@/components/ui/Button'
import {
  MAX_ORDER_QUANTITY,
  SHOP_COPY,
  formatPrice,
  getPublishedProduct,
  leadTimeLabel,
  reserveHref,
  resolveConfig,
  stockLabel,
  type Product,
} from '@/lib/data/products'

const FESTOON_SET_SLUG = 'nm-festoon-set-4'
const FESTOON_SET_MIN_QTY = 4

// The sticky bar would otherwise cover the bottom of the footer on phones.
export function useStickyBarPadding() {
  useEffect(() => {
    document.body.classList.add('pb-[76px]', 'lg:pb-0')
    return () => document.body.classList.remove('pb-[76px]', 'lg:pb-0')
  }, [])
}

function initialValues(product: Product): Record<string, string> {
  return Object.fromEntries((product.options ?? []).map((option) => [option.id, option.choices[0].id]))
}

export default function ProductBuyBox({ product }: { product: Product }) {
  const [values, setValues] = useState(() => initialValues(product))
  const [quantity, setQuantity] = useState(1)

  // Read here rather than with useSearchParams so product pages stay statically generated.
  useEffect(() => {
    const top = new URLSearchParams(window.location.search).get('top')
    const topOption = product.options?.find((option) => option.id === 'top')
    if (top && topOption?.choices.some((choice) => choice.id === top)) {
      setValues((current) => ({ ...current, top }))
    }
  }, [product])

  useStickyBarPadding()

  const config = resolveConfig(product, values, quantity)
  const buyNow = config.stripePaymentLink
  const href = buyNow ?? reserveHref(product, config)
  const ctaLabel = buyNow ? 'Buy now' : 'Reserve'
  const preorder = product.availability === 'preorder'
  const festoonSet = getPublishedProduct(FESTOON_SET_SLUG)
  const showSetNudge = !!festoonSet && values.top === 'festoon' && config.quantity >= FESTOON_SET_MIN_QTY

  const select = (optionId: string, choiceId: string) => {
    setValues((current) => ({ ...current, [optionId]: choiceId }))
    track('configurator_change', { product: product.slug, option: optionId, choice: choiceId })
  }
  const changeQuantity = (next: number) => {
    const clamped = Math.min(MAX_ORDER_QUANTITY, Math.max(1, next))
    if (clamped === quantity) return
    setQuantity(clamped)
    track('configurator_change', { product: product.slug, option: 'quantity', choice: String(clamped) })
  }
  const onCta = () => track('reserve_click', { product: product.slug, quantity: config.quantity, total: config.total })

  return (
    <>
      <div className="border border-nm-border bg-nm-s1 p-6 md:p-7">
        <p className="font-mono text-[12px] uppercase tracking-[1.5px] text-nm-green-text mb-3">{stockLabel(product)}</p>
        <h1 className="text-[clamp(26px,2.4vw,34px)] font-bold text-nm-text-p leading-[1.12] tracking-[-0.025em] mb-4">
          {product.name}
        </h1>
        <p className="text-[34px] font-bold text-nm-text-p tracking-[-0.02em] leading-none">{formatPrice(product.priceEur)}</p>
        <p className="mt-2 text-[13px] text-nm-text-t">{SHOP_COPY.vatNote}</p>
        <p className="mt-3 text-[15px] font-medium text-nm-text-p">
          {preorder ? SHOP_COPY.preorderLine : `Ships ${leadTimeLabel(product)}`}
        </p>

        <div className="mt-6 space-y-5">
          {(product.options ?? []).map((option) => (
            <fieldset key={option.id}>
              <legend className="font-mono text-[12px] uppercase tracking-[1.5px] text-nm-text-s mb-3">{option.label}</legend>
              <div className="flex flex-wrap gap-2">
                {option.choices.map((choice) => {
                  const checked = values[option.id] === choice.id
                  return (
                    <label
                      key={choice.id}
                      className={`inline-flex items-center gap-1.5 min-h-11 px-4 py-2 rounded-full border text-[15px] cursor-pointer transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-nm-green-text ${
                        checked
                          ? 'border-nm-green-text bg-nm-green-deep text-nm-text-p'
                          : 'border-nm-border-light text-nm-text-s hover:border-nm-field hover:bg-nm-s2'
                      }`}
                    >
                      <input
                        type="radio"
                        name={option.id}
                        value={choice.id}
                        checked={checked}
                        onChange={() => select(option.id, choice.id)}
                        className="sr-only"
                      />
                      {choice.label}
                      {choice.priceDeltaEur > 0 && <span className="font-mono text-[13px]">+{formatPrice(choice.priceDeltaEur)}</span>}
                    </label>
                  )
                })}
              </div>
              {config.selections.find((s) => s.option.id === option.id)?.choice.note && (
                <p className="mt-2 text-[13px] text-nm-text-s">
                  {config.selections.find((s) => s.option.id === option.id)?.choice.note}
                </p>
              )}
            </fieldset>
          ))}

          <div>
            <label htmlFor="quantity" className="block font-mono text-[12px] uppercase tracking-[1.5px] text-nm-text-s mb-3">
              Quantity
            </label>
            <div className="inline-flex items-center border border-nm-field rounded-lg overflow-hidden">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={config.quantity <= 1}
                onClick={() => changeQuantity(quantity - 1)}
                className="w-11 h-11 text-[20px] text-nm-text-p hover:bg-nm-s2 disabled:text-nm-text-t disabled:hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nm-green-text"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX_ORDER_QUANTITY}
                value={quantity}
                onChange={(e) => changeQuantity(Number(e.target.value) || 1)}
                className="w-14 h-11 bg-transparent text-center text-[15px] text-nm-text-p border-x border-nm-field [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-nm-green-accent"
              />
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={config.quantity >= MAX_ORDER_QUANTITY}
                onClick={() => changeQuantity(quantity + 1)}
                className="w-11 h-11 text-[20px] text-nm-text-p hover:bg-nm-s2 disabled:text-nm-text-t disabled:hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nm-green-text"
              >
                +
              </button>
            </div>
          </div>

          {showSetNudge && festoonSet && (
            <p className="border border-nm-green-text bg-nm-green-deep px-4 py-3 text-[15px] text-nm-text-p">
              The Festoon Set of 4 is {formatPrice(festoonSet.priceEur)} (save €67).{' '}
              <Link href={`/shop/${festoonSet.slug}`} className="font-semibold text-nm-green-text underline underline-offset-2 hover:text-nm-green-bright">
                See the set
              </Link>
            </p>
          )}
        </div>

        <div className="mt-7 pt-6 border-t border-nm-border">
          <div className="flex items-baseline justify-between gap-4 mb-5" aria-live="polite">
            <span className="font-mono text-[12px] uppercase tracking-[1.5px] text-nm-text-s">Total</span>
            <span className="text-[26px] font-bold text-nm-text-p leading-none tracking-[-0.02em]">{formatPrice(config.total)}</span>
          </div>
          <Button href={href} external={!!buyNow} onClick={onCta} size="lg" withArrow className="w-full">
            {ctaLabel}
          </Button>
          {!buyNow && (
            <p className="mt-4 text-[13px] leading-[1.6] text-nm-text-s">
              {preorder ? SHOP_COPY.reserveNote : SHOP_COPY.orderNote}
            </p>
          )}
        </div>
      </div>

      {/* Mobile: the price and the CTA stay on screen while reading the rest of the page. */}
      <div className="lg:hidden fixed left-0 right-0 bottom-0 z-40 border-t border-nm-border-mid bg-nm-bg px-4 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[20px] font-bold text-nm-text-p leading-none">{formatPrice(config.total)}</p>
          <p className="mt-1 text-[12px] text-nm-text-t truncate">{stockLabel(product)}</p>
        </div>
        <Button href={href} external={!!buyNow} onClick={onCta} size="md" withArrow>
          {ctaLabel}
        </Button>
      </div>
    </>
  )
}
