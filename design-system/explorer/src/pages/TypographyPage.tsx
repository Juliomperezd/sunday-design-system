import styles from './TypographyPage.module.css';

interface TypeRowProps {
  label: string;
  size: string;
  lineHeight: number;
  letterSpacing: string;
  weight: number;
  sample?: string;
}

function TypeRow({ label, size, lineHeight, letterSpacing, weight, sample }: TypeRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.rowMeta}>
        <span className={styles.rowLabel}>{label}</span>
        <span className={styles.rowSpec}>
          {size} · {weight === 400 ? 'Regular' : 'Medium'} · lh {lineHeight} · ls {letterSpacing}
        </span>
      </div>
      <div
        className={styles.rowSample}
        style={{ fontSize: size, fontWeight: weight, lineHeight, letterSpacing }}
      >
        {sample ?? label}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.table}>{children}</div>
    </section>
  );
}

export function TypographyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Typography</h1>
        <p className={styles.subtitle}>
          Helvetica Neue LT Std · Two weights: Regular (400) and Medium (500)
        </p>
      </div>

      <Section title="Headings">
        <TypeRow label="Hero Regular"     size="6rem"       lineHeight={0.85}  letterSpacing="-0.05em" weight={400} sample="Hero Regular" />
        <TypeRow label="Hero Emphasized"  size="6rem"       lineHeight={0.85}  letterSpacing="-0.05em" weight={500} sample="Hero Emphasized" />
        <TypeRow label="XXXL Regular"     size="4.5rem"     lineHeight={0.90}  letterSpacing="-0.05em" weight={400} sample="XXXL Regular" />
        <TypeRow label="XXXL Emphasized"  size="4.5rem"     lineHeight={0.90}  letterSpacing="-0.05em" weight={500} sample="XXXL Emphasized" />
        <TypeRow label="XXL Regular"      size="3.5rem"     lineHeight={0.90}  letterSpacing="-0.05em" weight={400} sample="XXL Regular" />
        <TypeRow label="XXL Emphasized"   size="3.5rem"     lineHeight={0.90}  letterSpacing="-0.05em" weight={500} sample="XXL Emphasized" />
        <TypeRow label="XL Regular"       size="3rem"       lineHeight={0.90}  letterSpacing="-0.05em" weight={400} sample="XL Regular" />
        <TypeRow label="XL Emphasized"    size="3rem"       lineHeight={0.90}  letterSpacing="-0.05em" weight={500} sample="XL Emphasized" />
        <TypeRow label="L Regular"        size="2.5rem"     lineHeight={1.0}   letterSpacing="-0.05em" weight={400} sample="L Regular" />
        <TypeRow label="L Emphasized"     size="2.5rem"     lineHeight={1.0}   letterSpacing="-0.05em" weight={500} sample="L Emphasized" />
        <TypeRow label="M Regular"        size="2rem"       lineHeight={1.0}   letterSpacing="-0.05em" weight={400} sample="M Regular" />
        <TypeRow label="M Emphasized"     size="2rem"       lineHeight={1.0}   letterSpacing="-0.05em" weight={500} sample="M Emphasized" />
        <TypeRow label="S Regular"        size="1.75rem"    lineHeight={1.1}   letterSpacing="-0.05em" weight={400} sample="S Regular" />
        <TypeRow label="S Emphasized"     size="1.75rem"    lineHeight={1.1}   letterSpacing="-0.05em" weight={500} sample="S Emphasized" />
        <TypeRow label="XS Regular"       size="1.5rem"     lineHeight={1.058} letterSpacing="-0.05em" weight={400} sample="XS Regular" />
        <TypeRow label="XS Emphasized"    size="1.5rem"     lineHeight={1.058} letterSpacing="-0.05em" weight={500} sample="XS Emphasized" />
        <TypeRow label="XXS Regular"      size="1.3125rem"  lineHeight={1.1}   letterSpacing="-0.05em" weight={400} sample="XXS Regular" />
        <TypeRow label="XXS Emphasized"   size="1.3125rem"  lineHeight={1.1}   letterSpacing="-0.05em" weight={500} sample="XXS Emphasized" />
      </Section>

      <Section title="Body">
        <TypeRow label="L Regular"    size="1.125rem" lineHeight={1.111} letterSpacing="-0.03em" weight={400} sample="The quick brown fox jumps over the lazy dog." />
        <TypeRow label="L Emphasized" size="1.125rem" lineHeight={1.111} letterSpacing="-0.03em" weight={500} sample="The quick brown fox jumps over the lazy dog." />
        <TypeRow label="M Regular"    size="1rem"     lineHeight={1.25}  letterSpacing="-0.03em" weight={400} sample="The quick brown fox jumps over the lazy dog." />
        <TypeRow label="M Emphasized" size="1rem"     lineHeight={1.25}  letterSpacing="-0.03em" weight={500} sample="The quick brown fox jumps over the lazy dog." />
        <TypeRow label="S Regular"    size="0.875rem" lineHeight={1.286} letterSpacing="-0.03em" weight={400} sample="The quick brown fox jumps over the lazy dog." />
        <TypeRow label="S Emphasized" size="0.875rem" lineHeight={1.286} letterSpacing="-0.03em" weight={500} sample="The quick brown fox jumps over the lazy dog." />
        <TypeRow label="XS Regular"   size="0.75rem"  lineHeight={1.167} letterSpacing="-0.03em" weight={400} sample="The quick brown fox jumps over the lazy dog." />
        <TypeRow label="XS Emphasized" size="0.75rem" lineHeight={1.167} letterSpacing="-0.03em" weight={500} sample="The quick brown fox jumps over the lazy dog." />
      </Section>

      <Section title="Button">
        <TypeRow label="M"           size="1rem"      lineHeight={1.25}  letterSpacing="-0.03em" weight={500} sample="Button M" />
        <TypeRow label="L Emphasized" size="0.6875rem" lineHeight={1.727} letterSpacing="-0.03em" weight={500} sample="Button L Emphasized" />
      </Section>
    </div>
  );
}
