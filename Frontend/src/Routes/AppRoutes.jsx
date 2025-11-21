import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../Pages/AuthPage'
import HomePage from '../Pages/HomePage'
import Layout from '../Pages/Layout'
import Syllabus from '../Pages/Syllabus'
import StudyPlan from '../Pages/StudyPlan'
import Progress from '../Pages/Progress'
import Quizes from '../Pages/Quizes'
import PrefrenceForm from '../Components/StudyPlan/PrefrenceForm'
import MentorChat from '../Components/mentorchat/MentorChat'
export default function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route element={<Layout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/syllabus" element={<Syllabus />} />
                    <Route path="/studyplan" element={<StudyPlan />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/quizes" element={<Quizes />} />
                    <Route path="/generatePlan" element={<PrefrenceForm />} />
                    <Route path="/mentor-chat" element={<MentorChat />} />

                </Route>
            </Routes>

        </div>
    )
}
