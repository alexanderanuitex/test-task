import {useState} from 'react';
import styles from "./StartView.module.scss";
import AddressComplete from "../../common/AddressComplete/AddressComplete";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const StartView = (props) => {
  const [address, setAddress] = useState('');
  const newAddress = (value) => {
    setAddress(value)
  }
  const renderPriceList = () => {
    return props.priceList.map((item, index) => (
      <div className={styles.offerCard} key={index}>
        <div className={styles.offerName}>{item.title}</div>
        <div className={styles.offerPrice}>
          <span>${item.fromPrice}</span> to <span>${item.toPrice}</span>
        </div>
        <h4 className={styles.includesTitle}>Includes</h4>
        <ul className={styles.offerIncludeList}>
          <li>
            <CheckCircleIcon className={styles.checkIcon} />
            {item.layoutConsulting}
          </li>
          <li>
            <CheckCircleIcon className={styles.checkIcon} />
            {item.layoutDesign}
          </li>
          <li>
            <CheckCircleIcon className={styles.checkIcon} />
            {item.planningPermits}
          </li>
          <li>
            <CheckCircleIcon className={styles.checkIcon} />
            {item.buildingPermits}
          </li>
          <li>
            <CheckCircleIcon className={styles.checkIcon} />
            {item.renderings}
          </li>
          <li>
            <CheckCircleIcon className={styles.checkIcon} />
            {item.walkthrough}
          </li>
        </ul>
        <Button
          className={styles.btnStartPlan}
          variant="contained"
          color="primary"
          onClick={() => props.goToWizzard(false, 1, { typeHome: item.type })}
        >
          Start now
        </Button>
        <div className={styles.takeInfo}>Takes 6 to 12 months</div>
      </div>
    ));
  };
  
  return (
    <div className={styles.startViewComponent}>
      <div className={styles.searchAddressContainer}>
        <p className={styles.searchDesc}>
          Local architect and Real Estate project management for Santa Clara
          County homeowners, focusing on Cupertino, Los Altos, Mountain View,
          and Palo Alto.
        </p>
        <h1 className={styles.searchTitle}>Where do you want to build?</h1>
        <form className={styles.searchAddress} noValidate autoComplete="off">
          <AddressComplete newAddress={newAddress}  address={props.result.address}/>
          <Button
            variant="contained"
            color="primary"
            type="button"
            disabled={!address}
            onClick={() => props.goToWizzard(true, 1, {address})}
            className={styles.searchBtn}
          >
            Next
          </Button>
        </form>
      </div>
      <div className={styles.offerPlansContainer}>
        <h1 className={styles.offerTitle}>
          Fixed Price Architect / Design Plans
        </h1>
        <div className={styles.offerList}>{renderPriceList()}</div>
        <div className={styles.cardSubinfo}>
          Demonstrated Success. Dozens of Projects completed by our Team
        </div>
      </div>
    </div>
  );
};

export default StartView;
