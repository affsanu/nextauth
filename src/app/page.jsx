'use client'
import {
  Button,
  Typography,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import Typewriter from 'typewriter-effect';

const users = [
  {
    name: "John Michael",
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    name: "Laurent Perrier",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    name: "Michael Levi",
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    name: "Miriam Eric",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
  },
  {
    name: "Richard Gran",
    img: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
];

const workTitle = [
  'Mern Developer', 
  'Creative Design', 
  'Saidpur News',
  'Blood Donation'
]

export function home() {

  return (
    <>
      <header className="h-full min-h-screen w-screen bg-white px-4 pt-24">
        <div className="container mx-auto flex flex-col-reverse items-center lg:flex-row">
          <div className="mr-0 lg:mr-16 xl:mr-24">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-8 text-4xl !leading-tight md:text-5xl"
            >
              <Typewriter
                options={{
                  strings: workTitle,
                  autoStart: true,
                  loop: true,
                }}
              />
            </Typography>
            <Typography
              variant="lead"
              className="mb-16 text-gray-700 md:pr-16 xl:pr-28"
            >
              have been working since 2012. I am proficient in ui design, digital marketing & web development.
            </Typography>
            <div className="mb-6 flex w-full flex-col gap-2 md:mb-2 md:w-10/12 md:flex-row">
              <Input label="Enter your email" size="lg" />
              <Button className="w-full px-4 md:w-[12rem]">get started</Button>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="inline-flex items-center"
            >
              We care about your data in our&nbsp;
              <Typography
                as="a"
                href="#"
                variant="small"
                className="underline decoration-gray-500 underline-offset-4"
              >
                privacy policy
              </Typography>
            </Typography>
            <div className="mt-16 mb-12 flex flex-col-reverse sm:flex-row sm:items-center lg:mb-0">
              <div className="flex items-center">
                {users.map(({ name, img }, index) => (
                  <Avatar
                    key={index}
                    src={img}
                    alt={name}
                    variant="circular"
                    className={`${index === 0 ? "" : "-ml-4"
                      } cursor-pointer border-2 border-white`}
                  />
                ))}
              </div>
              <div className="mb-6 sm:mb-0 sm:ml-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((el, key) => (
                    <StarIcon key={key} className="h-6 w-6 text-yellow-700" />
                  ))}
                  <Typography color="blue-gray" className="ml-2 !font-semibold">
                    5.0
                  </Typography>
                </div>
                <Typography color="gray" className="mt-1 ml-0.5 font-normal">
                  from 200+ reviews
                </Typography>
              </div>
            </div>
          </div>
          <img
            src="https://scontent.fdac157-1.fna.fbcdn.net/v/t39.30808-6/319531369_2432248900263653_5012719144125956361_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHt_3_rXq-AajnRv3jRNwfFp6vgdCVhCXinq-B0JWEJeDlReSteMVgBn4Gj-fieDznYcoUhNc52swW4dzEeQJ10&_nc_ohc=5C4ejzjbxlsAX-u39lJ&_nc_ht=scontent.fdac157-1.fna&oh=00_AfBjl4lGJcUrwdQa64UCfY-huDLjTQzlrHLTpOqRDLd6mQ&oe=646CCBD8"
            alt="team work"
            className="lg:0 mb-8 h-96 w-full rounded-xl object-cover lg:h-[40rem] lg:w-1/2"
          />
        </div>
      </header>
    </>
  );
}

export default home;