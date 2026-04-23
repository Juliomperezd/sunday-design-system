import { colors } from '../../../src/tokens/tokens';
import styles from './ColorsPage.module.css';

interface TokenRowProps {
  name: string;
  value: string;
  cssVar: string;
}

function TokenRow({ name, value, cssVar }: TokenRowProps) {
  const isLight =
    value === '#ffffff' ||
    value.includes('255 255 255') ||
    value === '#fff4d1' ||
    value === '#ebedfb' ||
    value === '#adf6c0' ||
    value === '#ffd1dc';

  return (
    <div className={styles.row}>
      <div
        className={styles.swatch}
        style={{
          backgroundColor: value,
          border: isLight ? '1px solid rgb(0 0 0 / 0.08)' : undefined,
        }}
      />
      <div className={styles.rowInfo}>
        <span className={styles.rowName}>{name}</span>
        <span className={styles.rowVar}>{cssVar}</span>
      </div>
      <span className={styles.rowValue}>{value}</span>
    </div>
  );
}

function GradientTokenRow({ name, cssVar, gradient }: { name: string; cssVar: string; gradient: string }) {
  return (
    <div className={styles.row}>
      <div className={styles.swatch} style={{ background: gradient }} />
      <div className={styles.rowInfo}>
        <span className={styles.rowName}>{name}</span>
        <span className={styles.rowVar}>{cssVar}</span>
      </div>
      <span className={styles.rowValue} style={{ fontSize: '0.65rem' }}>gradient</span>
    </div>
  );
}

function Group({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className={styles.group}>
      <div className={styles.groupHeader}>
        <h2 className={styles.groupName}>{title}</h2>
        {description && <p className={styles.groupDesc}>{description}</p>}
      </div>
      <div className={styles.rows}>{children}</div>
    </section>
  );
}

export function ColorsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Colors</h1>
        <p className={styles.subtitle}>Semantic color tokens · Valores confirmados.</p>
      </div>

      <div className={styles.groups}>

        {/* ── Background ── */}
        <Group title="Background · Surfaces">
          <TokenRow name="Primary"   cssVar="--color-bg-primary"   value={colors.background.primary} />
          <TokenRow name="Secondary" cssVar="--color-bg-secondary" value={colors.background.secondary} />
        </Group>

        <Group title="Background · Brand">
          <TokenRow name="Sunday" cssVar="--color-bg-sunday" value={colors.background.sunday} />
        </Group>

        <Group title="Background · Feedback">
          <TokenRow name="Success" cssVar="--color-bg-success" value={colors.background.success} />
          <TokenRow name="Info"    cssVar="--color-bg-info"    value={colors.background.info} />
          <TokenRow name="Warning" cssVar="--color-bg-warning" value={colors.background.warning} />
          <TokenRow name="Error"   cssVar="--color-bg-error"   value={colors.background.error} />
        </Group>

        <Group title="Background · Action" description="Button backgrounds">
          <TokenRow name="Primary"           cssVar="--color-bg-button-primary"            value={colors.background.buttonPrimary} />
          <TokenRow name="Secondary"         cssVar="--color-bg-button-secondary"          value={colors.background.buttonSecondary} />
          <TokenRow name="Disabled"          cssVar="--color-bg-button-disabled"           value={colors.background.buttonDisabled} />
          <TokenRow name="Primary reversed"  cssVar="--color-bg-button-primary-reversed"   value={colors.background.buttonPrimaryReversed} />
          <TokenRow name="Secondary reversed" cssVar="--color-bg-button-secondary-reversed" value={colors.background.buttonSecondaryReversed} />
          <TokenRow name="Disabled reversed" cssVar="--color-bg-button-disabled-reversed"  value={colors.background.buttonDisabledReversed} />
          <TokenRow name="Success"           cssVar="--color-bg-button-success"            value={colors.background.buttonSuccess} />
          <TokenRow name="Info"              cssVar="--color-bg-button-info"               value={colors.background.buttonInfo} />
          <TokenRow name="Error"             cssVar="--color-bg-button-error"              value={colors.background.buttonError} />
          <TokenRow name="Warning"           cssVar="--color-bg-button-warning"            value={colors.background.buttonWarning} />
        </Group>

        <Group title="Background · Overlay">
          <TokenRow name="70%" cssVar="--color-overlay-70" value={colors.overlay[70]} />
          <TokenRow name="30%" cssVar="--color-overlay-30" value={colors.overlay[30]} />
        </Group>

        {/* ── Content ── */}
        <Group title="Content · Base" description="Text and icon colors">
          <TokenRow name="Primary"  cssVar="--color-content-primary"  value={colors.content.primary} />
          <TokenRow name="Secondary" cssVar="--color-content-secondary" value={colors.content.secondary} />
          <TokenRow name="Disabled" cssVar="--color-content-disabled" value={colors.content.disabled} />
        </Group>

        <Group title="Content · Reversed" description="On dark backgrounds">
          <TokenRow name="Primary reversed"  cssVar="--color-content-primary-reversed"  value={colors.content.primaryReversed} />
          <TokenRow name="Secondary reversed" cssVar="--color-content-secondary-reversed" value={colors.content.secondaryReversed} />
          <TokenRow name="Disabled reversed" cssVar="--color-content-disabled-reversed" value={colors.content.disabledReversed} />
        </Group>

        <Group title="Content · Action" description="Text on buttons">
          <TokenRow name="Primary"                  cssVar="--color-content-action-primary"            value={colors.content.actionPrimary} />
          <TokenRow name="Secondary"                cssVar="--color-content-action-secondary"          value={colors.content.actionSecondary} />
          <TokenRow name="Disabled"                 cssVar="--color-content-action-disabled"           value={colors.content.actionDisabled} />
          <TokenRow name="Primary reversed"         cssVar="--color-content-action-primary-reversed"   value={colors.content.actionPrimaryReversed} />
          <TokenRow name="Secondary reversed"       cssVar="--color-content-action-secondary-reversed" value={colors.content.actionSecondaryReversed} />
          <TokenRow name="Disabled reversed"        cssVar="--color-content-action-disabled-reversed"  value={colors.content.actionDisabledReversed} />
        </Group>

        <Group title="Content · Feedback">
          <TokenRow name="Success" cssVar="--color-content-success" value={colors.content.success} />
          <TokenRow name="Info"    cssVar="--color-content-info"    value={colors.content.info} />
          <TokenRow name="Error"   cssVar="--color-content-error"   value={colors.content.error} />
          <TokenRow name="Warning" cssVar="--color-content-warning" value={colors.content.warning} />
        </Group>

        <Group title="Content · Brand">
          <TokenRow name="Sunday" cssVar="--color-content-sunday" value={colors.content.sunday} />
        </Group>

        {/* ── Stroke ── */}
        <Group title="Stroke">
          <TokenRow name="Focus"            cssVar="--color-stroke-focus"            value={colors.stroke.focus} />
          <TokenRow name="Default"          cssVar="--color-stroke-default"          value={colors.stroke.default} />
          <TokenRow name="Divider"          cssVar="--color-stroke-divider"          value={colors.stroke.divider} />
          <TokenRow name="Focus reversed"   cssVar="--color-stroke-focus-reversed"   value={colors.stroke.focusReversed} />
          <TokenRow name="Default reversed" cssVar="--color-stroke-default-reversed" value={colors.stroke.defaultReversed} />
          <TokenRow name="Divider reversed" cssVar="--color-stroke-divider-reversed" value={colors.stroke.dividerReversed} />
          <TokenRow name="Error"            cssVar="--color-stroke-error"            value={colors.stroke.error} />
          <TokenRow name="Warning"          cssVar="--color-stroke-warning"          value={colors.stroke.warning} />
        </Group>

        <Group title="Stroke · AI" description="Gradient stroke — use with padding-box / border-box technique">
          <GradientTokenRow
            name="AI"
            cssVar="--color-stroke-ai"
            gradient={colors.stroke.ai}
          />
        </Group>

      </div>
    </div>
  );
}
