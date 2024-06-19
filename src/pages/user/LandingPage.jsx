import { FilledButton } from '@/components';
import { LayoutUser } from '@/layouts';
import { Link } from 'react-router-dom';
import HeroImage from '@/assets/hero.png';
import Menu1 from '@/assets/menu-1.png';
import Menu2 from '@/assets/menu-2.png';
import Menu3 from '@/assets/menu-3.png';
import Menu4 from '@/assets/menu-4.png';
import Why1 from '@/assets/why-1.png';
import Why2 from '@/assets/why-2.png';
import Why3 from '@/assets/why-3.png';
import Why4 from '@/assets/why-4.png';

export function LandingPage() {
  const WHY_CHOOSE_US = [
    {
      img: Why1,
      alt: 'Quality Ingredients',
      title: 'Quality Ingredients',
      description: 'All basic ingredients come from high-quality standards.',
    },
    {
      img: Why2,
      alt: 'Cancel Anytime',
      title: 'Cancel Anytime',
      description: 'Cancel your subscription anytime you want.',
    },
    {
      img: Why3,
      alt: 'Made with Love',
      title: 'Made with Love',
      description: 'All meals are made with love and care.',
    },
    {
      img: Why4,
      alt: 'Prove It Now',
      title: 'Prove It Now',
      description: 'Prove it now by subscribing to our meal package.',
    },
  ];

  const MENU_ITEMS = [
    {
      img: Menu1,
      alt: 'Menu 1',
      title: 'Veggies',
      description: '& Plant-Based Meals',
      color: {
        bg: 'bg-green-600',
        text: 'text-white',
      },
    },
    {
      img: Menu2,
      alt: 'Menu 2',
      title: 'Meat & Veggies',
      description: 'Our Most Popular Plan',
      color: {
        bg: 'bg-yellow-600',
        text: 'text-white',
      },
    },
    {
      img: Menu3,
      alt: 'Menu 3',
      title: 'Fit & Healthy',
      description: 'For a Balanced Life',
      color: {
        bg: 'bg-blue-600',
        text: 'text-white',
      },
    },
    {
      img: Menu4,
      alt: 'Menu 4',
      title: 'Family Friendly',
      description: 'Kid-Tested Recipes',
      color: {
        bg: 'bg-red-600',
        text: 'text-white',
      },
    },
  ];

  return (
    <LayoutUser>
      <section className="flex flex-col lg:flex-row items-center justify-center h-auto lg:space-x-8 bg-primary bg-opacity-10 -mx-8 -mt-8 px-8 py-40">
        <div className="flex flex-col items-center lg:items-start justify-center max-w-lg space-y-4 lg:mr-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-center lg:text-left">
            Welcome to <span className="text-primary underline">MenuMager</span>
          </h1>
          <p className="text-gray-600 mt-4 max-w-sm text-sm sm:text-lg leading-relaxed text-center lg:text-left">
            Your daily meal solution for lazy one. Enjoy a variety of delicious meals without {''}
            <span className="font-bold">leaving your home</span>.
          </p>
          <div className="mt-4">
            <Link to="/order/select-plan">
              <FilledButton className="w-32 sm:w-48 h-10 sm:h-12">Get Started</FilledButton>
            </Link>
          </div>
        </div>
        <div className="mt-8 hidden lg:block">
          <img
            src={HeroImage}
            alt="Hero"
            className="w-96 h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section
        className="flex flex-col items-center justify-center h-auto py-40 bg-gray-100 px-16 -mx-8 lg:px-20"
        id="about-us"
      >
        <h2 className="text-3xl font-bold text-center">
          Why Choose <span className="text-primary">MenuMager</span>
        </h2>
        <div className="grid grid-cols-1 gap-2 mt-10 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 mx-2 lg:mx-8 max-w-xs hover:transform hover:scale-105 transition-transform hover:cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.alt}
                className="w-24 h-24"
              />
              <h3 className="text-lg font-bold text-center">{item.title}</h3>
              <p className="text-gray-600 text-center text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="flex flex-col items-center justify-center h-auto py-32 bg-gray-100 px-12 lg:px-24 -mx-8"
        id="menu"
      >
        <h2 className="text-3xl font-bold text-center">
          Choose Your Preferred <span className="text-primary">Meal Plan</span>
        </h2>
        <div className="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-4">
          {MENU_ITEMS.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center space-y-2 max-w-xs rounded-lg overflow-hidden shadow-lg col-span-1 hover:transform hover:scale-105 transition-transform hover:cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.alt}
                className="w-80 h-80 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
              <div className={`absolute bottom-0 left-0 p-4 flex flex-col gap-2`}>
                <h3 className="text-3xl font-semibold text-white uppercase">{item.title}</h3>
                <p
                  className={`text-xs uppercase ${item.color.text} ${item.color.bg} max-w-fit px-2 py-1 rounded-md font-semibold`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-8 w-full flex justify-center items-center flex-col gap-4 col-span-1 lg:col-span-4">
            <div className="bg-primary-hover w-full flex flex-col justify-center items-center text-white font-bold px-4 sm:px-6 lg:px-0 h-full lg:h-32 py-4 shadow-lg">
              <h3 className="text-2xl text-center">Everything You Need, All In One Box</h3>
              <p className="text-sm text-center mt-2 font-normal max-w-sm">
                The best of meal kits and online grocery shopping, streamlined into one weekly box.
              </p>
            </div>
            <Link to="#">
              <FilledButton className="w-48 h-12">See All Meal Plans</FilledButton>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center h-auto py-40 bg-gray-100 px-16 -mx-8 lg:px-20">
        <h2 className="text-3xl font-bold text-center">
          Get Started with <span className="text-primary">MenuMager</span> Today!
        </h2>
        <div className="mt-8">
          <Link to="/order/select-plan">
            <FilledButton className="w-48 h-12">Order Now</FilledButton>
          </Link>
        </div>
      </section>
    </LayoutUser>
  );
}
