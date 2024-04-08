import React from 'react';
import {FeatureProducts} from "../FeatureProducts/FeatureProducts"
import {CategorySlider} from "../CategorySlider/CategorySlider"
import {MainSlider} from "../MainSlider/MainSlider"

import { Helmet } from "react-helmet";

import Style from './Home.module.css';





export function Home() {
  return <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Fresh E-Commerce</title>
            </Helmet>

  <MainSlider />
  <CategorySlider/>
 <FeatureProducts/>
  </>
}

