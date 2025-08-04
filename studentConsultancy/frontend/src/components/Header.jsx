import React from 'react'
import { Link } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter';

//icons
import { FaArrowRight } from 'react-icons/fa'
import bgVideo from '../assets/bgvideo2.mp4';

function HeroSection() {
  return (
    <h1 className="text-4xl font-semibold tracking-tight sm:text-2xl" style={{ fontSize: '1.5rem' }}>
      Create Pathways for Students to{' '}
      <span className="text-primary bg-white">
        <Typewriter
          words={[
            'Study in Top Universities.',
            'Explore Global Opportunities.',
            'Achieve Academic Excellence.',
            'Build a Successful Career.',
            'Turn Their Dreams into Reality.',
          ]}
          loop={0} // 0 means infinite
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </span>
    </h1>
  );
}

const Header = () => {
  return (
    <div className="relative h-screen overflow-hidden top-div-height "  >
      
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] responsive-height"
        autoPlay
        loop
        muted
        playsInline
        
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional dark overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0"></div>

      {/* Content */}
      <div className="relative isolate px-10 pt-14 lg:px-8 z-10 text-white">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto lg:max-w-2xl">
          {/* Optional Banner */}
          <div className="hidden md:mb-8 md:flex md:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white/30 hover:ring-white/60">
              Announcing our Latest Program for Medical Students.{' '}
              <Link to="#" className="font-semibold text-primary">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="text-center mt-44">
            <h1 className="text-4xl font-semibold tracking-tight  sm:text-2xl" style={{fontSize : '1.5rem'}}>
              Create Pathways for Students to <span className="text-primary bg-white"><Typewriter
                  words={[
                    'Study in Top Universities.',
                    'Explore Global Opportunities.',
                    'Develop Skills for a Brighter Future.',
                    'Build a Successful Career.',
                    'Turn Their Dreams into Reality.',
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={2000}
                /></span>

            </h1>
            <p className="flex justify-center mt-6 text-sm font-medium lg:text-base">
              <span className='w-4/6'>
                We Think About You & Strive to Deliver the Best Because You Deserve the Best.
              </span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/connect" className="btn">
                Connect
              </Link>
              <Link
                to="/programs"
                className="text-sm font-semibold flex items-center gap-1.5 leading-6 hover:text-gray-300 transition-colors"
              >
                Our Programs <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Blob */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
