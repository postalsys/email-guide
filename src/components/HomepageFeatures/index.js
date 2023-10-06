import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: "Transactional Emails",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: <>Emails automatically sent in response to specific user actions, such as sign-ups, password resets, and purchase confirmations.</>,
    target: "/docs/transactional",
  },
  {
    title: "Marketing Emails",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: <>Strategically timed emails promoting your brand, including newsletters, onboarding sequences, and cart abandonment reminders.</>,
    target: "/docs/marketing",
  },
  {
    title: "Sending on Behalf of Users",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>Seamless automation for user-representative emails. A system that sends emails as if they're from your users.</>,
    target: "/docs/user-based",
  },
];

function Feature({ Svg, title, description, target }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Link className="" to={target}>
            <Svg className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>
        <Link className="" to={target}>
            {title}
        </Link></h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
