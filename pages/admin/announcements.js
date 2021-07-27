import React, { useState } from 'react';
import Head from 'next/head';
import { Topnav } from '../../components/admin/nav/Topnav';
import { AnnouncementDisplay } from '../../components/admin/announcements/AnnouncementDisplay';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth';

function Admin() {
  const AuthUser = useAuthUser();

  return (
    <>
      <div className="bg-gray-200">
        <Head>
          <title>Main</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Topnav email={AuthUser.email} signOut={AuthUser.signOut} />

        <main>
          <AnnouncementDisplay user={AuthUser} />
            <form action="#" method="POST">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label for="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                   
                  </span>
                  <input type="text" name="Title" id="title" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                  </input>
                    </div>
                  <div class="mt-1 flex rounded-md shadow-sm">
                     <label for="CourseCode" className="block text-sm font-medium text-gray-700">
                       Course Code
                       </label>
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                   
                  </span>
                  <input type="text" name="CourseCode" id="CourseCode" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                  </input>
                    </div>
                <div>
              <label for="announcementText" className="block text-sm font-medium text-gray-700">
                Announcement
              </label>
              <div class="mt-1">
                <textarea id="announcementText" name="announcementText" rows="5" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md">
                </textarea>
              </div>
              <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
               Post
             </button>
             
            </div>
           </div>
          </div>
          </div>
        </form>
              </div>
              
        </main>
      </div>
    </>
  );
}
//Writes to a specific course's document
    const WriteCourseAnnouncement = () => {
        const sendData = () => {
            try {
                firebase
                    .firestore()
                    .collection('Announcements')
                    .doc(CourseCode) 
                    .set({
                        title: title,
                        paragraph: announcementText,
                        course: CourseCode,
                        time: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then(alert('Announcement was successfully added.'))
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }
    }

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/',
})(Admin);
