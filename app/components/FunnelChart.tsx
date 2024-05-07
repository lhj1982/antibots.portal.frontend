"use client";
import sumBy from "lodash/sumBy";
import cx from "classnames";
import styles from "@/styles/FunnelChart.module.scss";

type Failure = {
  count: number;
  reason: string;
};

type SelfProps = {
  completed: number;
  entries: number;
  failures?: Failure[];
  invalidEntries: number;
  notSelectedEntries: number;
  selected: number;
  validEntries: number;
  showFailures?: boolean;
  wafEntries: number;
};

const SVG_FAILURES_VIEWBOX_WIDTH = 450;
const SVG_NORMAL_VIEWBOX_WIDTH = 308;
const MAX_WIDTH_WITHOUT_FAILURES = 450;
const MAX_WIDTH_WITH_FAILURES = 665;
const SVG_HEIGHT = 500;

const FunnelChart = (props: SelfProps) => {
  const {
    completed,
    entries,
    failures,
    invalidEntries,
    notSelectedEntries,
    selected,
    validEntries,
    showFailures,
    wafEntries,
  } = props;

  const textStyleNumber = cx(
    styles.textAnchorMiddle,
    styles.letterSpacing,
    styles["fill-color-number"]
  );
  const textStyleEntries = cx(
    styles.textAnchorMiddle,
    styles.letterSpacing,
    styles["fill-color-entries"]
  );
  const textStyleFailureNumber = cx(textStyleNumber, styles.textAnchorEnd);
  const textStyleFailureEntries = cx(textStyleEntries, styles.textAnchorEnd);
  const viewWidth = showFailures
    ? SVG_FAILURES_VIEWBOX_WIDTH
    : SVG_NORMAL_VIEWBOX_WIDTH;
  const textAlignPercentage = showFailures
    ? `${(308 / viewWidth / 2) * 100}%`
    : "50%";

  return (
    <div className="w-4/5 h-4/5">
      <svg
        viewBox={`0 0 ${viewWidth} ${SVG_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "100%", width: "100%" }}
      >
        {showFailures && (
          <>
            {validEntries > 0 && invalidEntries >= 0 && (
              <>
                <line x1="270" y1="157" x2="450" y2="157" stroke="gray" />
                <text
                  x="100%"
                  y="150"
                  fontSize="18"
                  className={textStyleFailureNumber}
                >
                  {invalidEntries}
                </text>
                <text
                  x="100%"
                  y="170"
                  fontSize="12"
                  className={textStyleFailureEntries}
                >
                  INVALID ENTRIES
                </text>
              </>
            )}
            {selected > 0 && notSelectedEntries >= 0 && (
              <>
                <line x1="249" y1="236.3" x2="450" y2="236.3" stroke="gray" />
                <text
                  x="100%"
                  y="230"
                  fontSize="18"
                  className={textStyleFailureNumber}
                >
                  {notSelectedEntries}
                </text>
                <text
                  x="100%"
                  y="250"
                  fontSize="12"
                  className={textStyleFailureEntries}
                >
                  NOT SELECTED
                </text>
              </>
            )}
          </>
        )}

        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.9768 26.4317C-2.42847 13.4606 7.21569 0 20.9144 0H287.002C300.725 0 310.371 13.5039 305.922 26.485L210.633 379.485C207.861 387.57 200.259 393 191.713 393H115.33C106.762 393 99.1469 387.544 96.3919 379.432L1.9768 26.4317Z"
          fill="url(#paint0_linear)"
        />
        <defs>
          <linearGradient id="paint0_linear" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="20%" className={styles['new-layer-color']} />
            <stop offset="20%" className={styles['top-funnel-color']} />
            <stop offset="40%" className={styles['second-funnel-color']} />
            <stop offset="40%" className={styles['third-funnel-color']} />
            <stop offset="60%" className={styles['fourth-funnel-color']} />
            <stop offset="60%" className={styles['fifth-funnel-color']} />
            <stop offset="80%" className={styles['bottom-funnel-color']} />
            <stop offset="80%" className={styles['new-layer-bottom-color']} />
          </linearGradient>
        </defs>
        <text
          x={textAlignPercentage}
          y="40"
          fontSize="28"
          className={textStyleNumber}
        >
          {wafEntries}
        </text>
        <text
          x={textAlignPercentage}
          y="60"
          fontSize="14"
          className={textStyleEntries}
        >
          WAF ENTRIES 
        </text>
        <text
          x={textAlignPercentage}
          y="119"
          fontSize="28"
          className={textStyleNumber}
        >
          {entries}
        </text>
        <text
          x={textAlignPercentage}
          y="139"
          fontSize="14"
          className={textStyleEntries}
        >
          ENTRIES
        </text>

        <text
          x={textAlignPercentage}
          y="198"
          fontSize="28"
          className={textStyleNumber}
        >
          {validEntries}
        </text>
        <text
          x={textAlignPercentage}
          y="218"
          fontSize="14"
          className={textStyleEntries}
        >
          VALID ENTRIES
        </text>

        <text
          x={textAlignPercentage}
          y="275"
          fontSize="28"
          className={textStyleNumber}
        >
          {selected}
        </text>
        <text
          x={textAlignPercentage}
          y="295"
          fontSize="14"
          className={textStyleEntries}
        >
          SELECTED
        </text>

        <text
          x={textAlignPercentage}
          y="354"
          fontSize="28"
          className={textStyleNumber}
        >
          {completed}
        </text>
        <text
          x={textAlignPercentage}
          y="374"
          fontSize="14"
          className={textStyleEntries}
        >
          WINNERS
        </text>
      </svg>
    </div>
  );
};

export default FunnelChart;