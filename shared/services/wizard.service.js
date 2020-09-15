import data from '../../db.json';

class WizardService {
  getQuestions = () => {
    return data;
  };
  setLocalStorge = (data, step, completedStep) => {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('step', step);
    localStorage.setItem('completedStep', completedStep);
    localStorage.setItem('Wizard', dataJSON);
  };
  getLocalStoregeWizard = () => {
    const data = localStorage.getItem('Wizard');
    const completedStep = localStorage.getItem('completedStep');
    const step = localStorage.getItem('step');
    return { result: JSON.parse(data), step: +step, completedStep: +completedStep }
  }
};

export default new WizardService();