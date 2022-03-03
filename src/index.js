import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation
} from "react-router-dom"

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/myapps' element={<Navigate replace to="/learn" />} />
      <Route path='/learn' element={<Learn />} >
        <Route path='courses' element={<Courses />} >
          <Route path=":courseId" element={<CourseId />} />
        </Route>
        <Route path='bundle' element={<Bundle />} />
      </Route>
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

function Home() {
  return (
    <div>
      <h1>Home Router</h1>
    </div>
  )
}

function Learn() {
  return (
    <div>
      <h1>Learn Router</h1>
      <h4>All courses lister here</h4>
      <Link className='btn btn-success' to="/learn/courses">Courses</Link> |
      <Link className='btn btn-primary' to="/learn/bundle">Bundle</Link>
      <Outlet />
    </div>
  )
}

function Courses() {
  const courseList = ["react", "vue", "node", "ng"];
  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)]
  return (
    <div>
      <h1>Courses Router</h1>
      <h4>Courses Part</h4>
      <p>
        More Test
      </p>
      <NavLink
        style={({ isActive }) => {
          return { backgroundColor: isActive ? "pink" : "red" }
        }}
        to={`/learn/courses/${randomCourseName}`}>{randomCourseName}</NavLink>
      <NavLink className="btn btn-light" to={`/learn/courses/test`}>Test</NavLink>

      <Outlet />
    </div>
  )
}

function Bundle() {
  return (
    <div>
      <h1>Bundle Router</h1>
      <h4>Bundle Part</h4>
    </div>
  )
}

function CourseId() {
  const Navigate = useNavigate();
  const { courseId } = useParams();
  return (
    <div>
      <h1>URL Params is : {courseId}</h1>
      <button onClick={() => {
        Navigate("/dashboard", { state: courseId });
      }} className='btn btn-warning'>Price</button>
      <Link to="/dashboard" state={"NodeJS"} >Test Link</Link>
    </div>
  )
}

function Dashboard() {
  const location = useLocation();
  return (
    <div>
      <h1>Info {location.state}</h1>

    </div>
  )
}

reportWebVitals();
