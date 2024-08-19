import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './store/store.js'
import { Provider } from 'react-redux'
import Layout from './components/Layout.jsx'
import {Login,Signup,DashBoard,ChannelPage} from './components/Authentication/index.js'
import {AllTweets,PostTweet} from './components/Tweet/index.js'
// import {PostVideo,VideoPage,AllPublishedVideos} from './components/Video/index.js'
import {PostVideo,AllPublishedVideos,VideoPage} from './components/Video/index.js'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import Home from './components/Home.jsx'
import Help from './components/Help.jsx'

const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='youtube-tweeter/login' element={<Login/>} />
      <Route path='youtube-tweeter/signup' element={<Signup/>} />
      <Route path='youtube-tweeter/all-tweets' element={<AllTweets/>}/>
      <Route path='youtube-tweeter/post-tweet' element={<PostTweet/>}/>
      <Route path='youtube-tweeter/post-video' element={<PostVideo/>}/>
      <Route path = 'youtube-tweeter/video-page/:videoId' element={<VideoPage/>}/>
      <Route path='youtube-tweeter/all-published-videos' element={<AllPublishedVideos/>}/>
      <Route path='youtube-tweeter/help' element={<Help/>} />
      <Route path='youtube-tweeter/dashboard' element={<DashBoard/>} />
      <Route path='youtube-tweeter/channel-page/:username' element={<ChannelPage/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
