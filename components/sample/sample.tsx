import styles from "./sample.module.css";

type SampleProps = {
  title: string;
};

function Sample({ title }: SampleProps) {
  return <div className={styles.root}>sample component {title}</div>;
}

export default Sample;
