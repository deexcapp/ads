import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../App.css";
import "../fire.scss";
import { AnimatePresence } from "framer-motion";
import Footer from "../Components/Footer";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { UserProvider } from "../context/userContext";
import { browserName } from "react-device-detect";


const tele = window.Telegram.WebApp;
const Home = () => {
const [loading, setLoading] = useState(true)
const location = useLocation();
// eslint-disable-next-line
const [hasVisitedBeforee, setHasVisitedBeforee] = useState(false);
const [hider, setHider] = useState(false);
const [restrictAccess, setRestrictAccess] = useState(false)

useEffect(() => {
  const handleContextMenu = (event) => event.preventDefault();
  const handleKeyDown = (event) => {
    if ((event.ctrlKey && (event.key === 'u' || event.key === 's')) || (event.ctrlKey && event.shiftKey && event.key === 'i')) {
      event.preventDefault();
    }
  };

  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
    document.removeEventListener('keydown', handleKeyDown);
  };
}, []);

    useEffect(() => {
        tele.ready();
        tele.expand();
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        
        // window.Telegram.WebApp.setHeaderColor('#29162c'); // Set header color to red
        window.Telegram.WebApp.setHeaderColor('#000'); // Set header color to red

              // Haptic feedback
      if (tele.HapticFeedback) {
        tele.HapticFeedback.impactOccurred("medium");
      }
      if (navigator.vibrate) {
        navigator.vibrate(100); // Vibrate for 100ms
    }


    }, []);

    useEffect(() => {
      // Check if the user has visited before using localStorage
      const visitedd = localStorage.getItem('hasVisitedBeforee');
      if (visitedd) {
        // User has visited before, no need to show the welcome message
        setHasVisitedBeforee(true);
      } else {
        setHider(true);
        // Set the item in localStorage to mark the user as visited
        localStorage.setItem('hasVisitedBeforee', 'true');
      }

      setTimeout(() => {
        setHider(false);
      }, 1000);


    // eslint-disable-next-line
    }, []);


    const overflow = 100;
    const scrollableEl = useRef(null);
  
    useEffect(() => {

      const isDashboardRoute = location.pathname.startsWith('/dashboardAdx') || location.pathname.startsWith('/dashboard');
      const restrictedBrowsers = ['Chrome', 'Firefox', 'Edge', 'Safari', 'Thor', 'Brave'];


      const isTelegramApp = tele && tele.initDataUnsafe && tele.initDataUnsafe.query_id;

  // Check if the user is on a browser but using Telegram (by checking for a Telegram UserAgent)
  const isTelegramBrowser = navigator.userAgent.includes("Telegram");

  if (
    (isDashboardRoute && !restrictedBrowsers.includes(browserName)) || // Block restricted browsers
    (isTelegramBrowser && isTelegramApp) // Block Telegram access from a browser
  ) {
    setRestrictAccess(true);
  }


      if (isDashboardRoute) {
        document.getElementById('footermain').style.display = 'none';
      }

      if (!isDashboardRoute) {
      document.body.style.overflowY = 'hidden';
      document.body.style.marginTop = `${overflow}px`;
      document.body.style.height = `${window.innerHeight + overflow}px`;
      document.body.style.paddingBottom = `${overflow}px`;
      window.scrollTo(0, overflow);
  
      let ts;
  
      const onTouchStart = (e) => {
        ts = e.touches[0].clientY;
      };
  
      const onTouchMove = (e) => {
        const el = scrollableEl.current;
        if (el) {
          const scroll = el.scrollTop;
          const te = e.changedTouches[0].clientY;
          if (scroll <= 0 && ts < te) {
            e.preventDefault();
          }
        } else {
          e.preventDefault();
        }
      };
      const onTouchMoveWithException = (e) => {
        const target = e.target.closest('#refer');
        if (!target) {
          onTouchMove(e);
        }
      };
    
      document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false });
      document.documentElement.addEventListener('touchmove', onTouchMoveWithException, { passive: false });
    
      // Cleanup event listeners on component unmount
      return () => {
        document.documentElement.removeEventListener('touchstart', onTouchStart);
        document.documentElement.removeEventListener('touchmove', onTouchMoveWithException);
      };
    }
  }, [location.pathname, overflow]); 
   
   

  return (
<>

<div className="w-full flex justify-center">
         
        <div className="w-full flex justify-center">
          <div className="flex flex-col space-y-3 w-full">


            

          <TonConnectUIProvider manifestUrl="https://animated-bavarois-24b30b.netlify.app/tonconnect-manifest.json">
        
          <UserProvider>
            <AnimatePresence mode="wait">
            {restrictAccess ? (
  <>
        <div className='w-full flex h-full justify-center px-5 items-center font-medium text-[20px]'>
        <div className='w-full pt-24 text-center flex flex-col space-y-3 justify-center items-center'>
          <p className='text-[28px] font-semibold'>
            Mobile rocks for gaming 😎 Open on your mobile device to play now!
          </p>
          <img 
            src='/stars.svg'
            alt="stars"
            className='w-[200px]'
          />
        </div>
      </div>
  </>
) : (
  <>

            <Outlet />

            <div id="footermain" className={`${loading || hider ? 'hidden' : 'flex'} z-30 flex-col bg-[#000] fixed bottom-0 pt-3 pb-6 left-0 right-0 justify-center items-center px-3`}>


<Footer/>

<div className="bg-[#000] z-20 h-[67px] w-full fixed bottom-0 left-0 right-0 ">

</div>

   

</div>

  </>
)}


            </AnimatePresence>
            </UserProvider>
            </TonConnectUIProvider>
    
          
          


        </div>
           </div>
           </div>
           </>
  );
};

export default Home;
