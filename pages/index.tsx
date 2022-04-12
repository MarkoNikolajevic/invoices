import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <main className='relative w-full'>
      <div className='mx-6 mt-8 flex flex-col md:mx-12 md:mt-14 lg:mx-auto lg:mt-18 lg:w-4/5'>
        <Header />
      </div>
    </main>
  );
};

export default Home
