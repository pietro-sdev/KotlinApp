import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.css";
import { Container } from "@mantine/core";

export type SectionProps = {
  className?: string;
  children: ReactNode;
  padding?: string;
  maxWidth?: string;
  bg?: string,
  style?: CSSProperties;
};

export const Section = ({
  children,
  className = '',
  padding = "0px",
  maxWidth = "1280px",
  bg = '#0000'
}: SectionProps) => {
  return (
    <section className="section-wraper"
    style={{
      background: bg,
      width:'100%'
    }}
    >   
      <Container 
      className={styles.container}
      bg={bg}
      >
        <div
          className={`${styles.section} ${className}`}
          style={{
            paddingTop: padding,
            paddingBottom: padding,
          }}
        >
          <div
            className={styles['section-inner']}
            style={{ maxWidth }}
          >
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
};
