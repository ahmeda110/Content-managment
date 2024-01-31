import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import { Dashboard } from "../Dashboard/dashboard"

export const Pages = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/"><Dashboard /></Route>
                    {/* All the routes go here */}
                </Switch>
            </Router>
        </>
    )
}