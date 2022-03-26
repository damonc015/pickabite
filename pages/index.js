import Head from "next/head";
import Map from "../components/map/map";
import classes from "../styles/Home.module.css";

export default function Home(props) {
  const { gKey } = props;
  return (
    <div className={classes.container}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Google Maps Food Application" />
        <meta
          name="keywords"
          content="Javascript, Google Maps api, food, restaurant, location"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <title>Pick a Bite</title>
      </Head>

      <div className={classes.contentContainer}>
        <Map gKey={gKey}></Map>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: { gKey: process.env.GOOGLE_MAPS_API_KEY },
    revalidate: 600,
  };
}
