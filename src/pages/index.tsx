import React, { useEffect } from 'react'

import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const Home = () => {
    const { title } = useDocusaurusContext().siteConfig

    useEffect(
        () => window.location.replace('/mini-collection/docs/common-functions'),
        []
    )

    return (
        <Layout
            title={title}
            description='Description will go into a meta tag in <head />'
        ></Layout>
    )
}

export default Home
