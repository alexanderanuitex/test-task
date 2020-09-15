import data from '../../db.json';

class WizzardService {
  getQuestions = () => {
    return data;
  };
  setLocalStorge = (data, step, completedStep) => {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('step', step);
    localStorage.setItem('completedStep', completedStep);
    localStorage.setItem('wizzard', dataJSON);
  };
  getLocalStoregeWizzard = () => {
    const data = localStorage.getItem('wizzard');
    const completedStep = localStorage.getItem('completedStep');
    const step = localStorage.getItem('step');
    return { result: JSON.parse(data), step: +step, completedStep: +completedStep }
  }
};

export default new WizzardService();