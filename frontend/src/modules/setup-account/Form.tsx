import React from 'react';
import BioData from './BioData';
import Goals from './Goals';
import HealthConditions from './HealthConditions';
import DietType from './DietType';
import { useSetupContext } from '../../context/SetupContext';
import SkinType from './SkinType';

const Form = () => {
  const { currentPage, setCurrentPage } = useSetupContext();
  switch (currentPage) {
    case 1:
      return <BioData />;
      break;
    case 2:
      return <Goals />;
    case 3:
      return <HealthConditions />;
    case 4:
      return <DietType />;
    case 5:
        return <SkinType />;
    default:
      return null;
      break;
  }
};

export default Form;
