import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Nav } from "../../components/Nav";
import { MainDisplay } from "../../components/MainDisplay";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import ReadFirestore from "../../firestore/ReadFirestore";
import firebase from "../../initFirebase";

firebase();

function Home() {
  const AuthUser = useAuthUser();
  // const [announce, setAnnounce] = useState();
  // const announcement = () => {
  //   firebase
  //     .firestore()
  //     .collection("Announcements")
  //     .doc("test")
  //     .onSnapshot(function (doc) {
  //       console.log(doc.data());
  //     });
  // };

  // const doc = await welcome.get();
  // if (!doc.exists) {
  //   console.log("No such document!");
  // } else {
  //   console.log("Document data:", doc.data());
  // }

  return (
    <div className="bg-gray-200">
      <Head>
        <title>Main</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav email={AuthUser.email} signOut={AuthUser.signOut} />

      <main>
        <MainDisplay />
      </main>
    </div>
  );
}

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/",
})(Home);
