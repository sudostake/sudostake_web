"use client";

import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type BorrowCurrencyHeroProps = {
  currencies: string[];
  tickIntervalMs?: number;
  tickDurationMs?: number;
  resetDurationMs?: number;
};

type AnimatedCurrencyProps = {
  currencies: string[];
  value: string;
  tickDurationMs: number;
  resetDurationMs: number;
  transition: CurrencyTransition | null;
};

const defaultCurrencies = ["a supported stablecoin"];

type CurrencyTransition = {
  id: number;
  kind: "tick" | "reset";
  items: string[];
  startIndex: number;
  targetIndex: number;
};

function AnimatedCurrency({
  currencies,
  value,
  tickDurationMs,
  resetDurationMs,
  transition,
}: AnimatedCurrencyProps) {
  const widestCurrency = currencies.reduce((widestLabel, currency) => {
    return currency.length > widestLabel.length ? currency : widestLabel;
  }, currencies[0]);
  const transitionStyle = transition
    ? ({
        "--currency-stack-from-rows": `${-transition.startIndex}`,
        animationDuration: `${
          transition.kind === "reset" ? resetDurationMs : tickDurationMs
        }ms`,
      } as CSSProperties)
    : undefined;

  return (
    <span
      className="currency-swap"
      data-animated={currencies.length > 1 ? "true" : "false"}
      data-width-label={widestCurrency}
      aria-label={value}
    >
      {transition ? (
        <span
          key={transition.id}
          className="currency-swap__stack"
          data-kind={transition.kind}
          style={transitionStyle}
          aria-hidden="true"
        >
          {transition.items.map((currency, index) => (
            <span
              key={`${transition.id}-${currency}-${index}`}
              className="currency-swap__slot"
            >
              {currency}
            </span>
          ))}
        </span>
      ) : (
        <span className="currency-swap__value" aria-hidden="true">
          {value}
        </span>
      )}
    </span>
  );
}

export function BorrowCurrencyHero({
  currencies,
  tickIntervalMs = 1500,
  tickDurationMs = 280,
  resetDurationMs = 220,
}: BorrowCurrencyHeroProps) {
  const configuredCurrencies = currencies.filter(
    (currency) => currency.trim().length > 0,
  );
  const availableCurrencies =
    configuredCurrencies.length > 0 ? configuredCurrencies : defaultCurrencies;
  const [activeIndex, setActiveIndex] = useState(0);
  const [transition, setTransition] = useState<CurrencyTransition | null>(null);
  const transitionIdRef = useRef(0);
  const currentIndex = activeIndex % availableCurrencies.length;
  const activeCurrency =
    availableCurrencies[currentIndex];

  const queueNextTransition = useEffectEvent(() => {
    if (availableCurrencies.length < 2 || transition) {
      return;
    }

    const nextTransition =
      currentIndex === availableCurrencies.length - 1
        ? {
            id: transitionIdRef.current + 1,
            kind: "reset" as const,
            items: availableCurrencies.slice(0, currentIndex + 1),
            startIndex: currentIndex,
            targetIndex: 0,
          }
        : {
            id: transitionIdRef.current + 1,
            kind: "tick" as const,
            items: [
              availableCurrencies[currentIndex + 1],
              availableCurrencies[currentIndex],
            ],
            startIndex: 1,
            targetIndex: currentIndex + 1,
          };

    transitionIdRef.current = nextTransition.id;

    startTransition(() => {
      setTransition(nextTransition);
    });
  });

  useEffect(() => {
    if (availableCurrencies.length < 2) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotionQuery.matches) {
      return;
    }

    if (transition) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      queueNextTransition();
    }, tickIntervalMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [availableCurrencies.length, tickIntervalMs, transition]);

  useEffect(() => {
    if (!transition) {
      return;
    }

    const completeTransitionId = window.setTimeout(() => {
      startTransition(() => {
        setActiveIndex(transition.targetIndex);
        setTransition(null);
      });
    }, transition.kind === "reset" ? resetDurationMs : tickDurationMs);

    return () => {
      window.clearTimeout(completeTransitionId);
    };
  }, [resetDurationMs, tickDurationMs, transition]);

  return (
    <div className="hero-copy">
      <p className="hero-kicker">Stake, borrow, stay exposed.</p>
      <h1>
        Borrow{" "}
        <AnimatedCurrency
          currencies={availableCurrencies}
          value={activeCurrency}
          tickDurationMs={tickDurationMs}
          resetDurationMs={resetDurationMs}
          transition={transition}
        />{" "}
        Without Unstaking
      </h1>
      <p className="hero-lede">
        Open a vault on a supported network, deposit your tokens, keep them
        staked, and unlock liquidity from that collateral while rewards
        continue to accrue.
      </p>
      <div className="hero-support" aria-label="Supported borrow currencies">
        <div className="support-group">
          <span className="support-label">Borrow</span>
          <div className="support-pills">
            {availableCurrencies.map((currency) => (
              <span key={currency} className="support-pill">
                {currency}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
