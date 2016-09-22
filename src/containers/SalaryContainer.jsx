/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';
import dispatcher, { dispatch } from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import { getItem as getLang } from '../common/lang';
import Loader from '../components/Loader/Loader.jsx';
import Header from '../components/Header/Header.jsx';
import UserInfo from '../components/UserInfo/UserInfo.jsx';
import FormControl from '../components/FormControl/FormControl.jsx';
import Select from '../components/Select/Select.jsx';
import InfoCard from '../components/InfoCard/InfoCard.jsx';
import Chart from '../components/Chart/Chart.jsx';
import TopAction from '../components/TopAction/TopAction.jsx';

import SalaryStore from '../stores/SalaryStore';
import UserStore from '../stores/UserStore';
import SalaryDataUtils from '../data-utils/SalaryDataUtils';


const defaultYear = new Date().getFullYear(),
      defaultMonth = new Date().getMonth() + 1,
      monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
        return {
          text: month,
          value: month
        };
      });


class Salary extends Component {

  constructor(props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
    this.onAccChange = this.onAccChange.bind(this);
    this.getSalary = this.getSalary.bind(this);
    this.getAccountList = this.getAccountList.bind(this);

    SalaryDataUtils.getSalaryCalendar();
  }

  static getStores() {
    return [SalaryStore, UserStore];
  }

  static calculateState() {
    return assign({}, SalaryStore.getState(), UserStore.getState());
  }

  render() {
    const { total, picInfo, infoList, salaryCalendar = {}, accountList, status, chartData, menu } = this.state,

      yearList = (function (year) {
        let list = [];

        for (; year <= defaultYear; year += 1) {
          list.unshift({
            text: year,
            value: year
          });
        }

        return list;
      }(salaryCalendar.minYear)),

      newAccountList = accountList || this.getAccountList(salaryCalendar.payrollPeriodList, defaultYear, defaultMonth),

      payMenu = (menu.ess || []).filter(item => item.name === 'myPay');

    return (
      <div style={{
        paddingBottom: '3rem'
      }}>
        <Header back title={payMenu && payMenu[0] && payMenu[0].text} />

        <UserInfo className='gap-t-lg gap-b-lg side-gap' userInfo={picInfo} />

        <div className='row gap-t'>
          <div className='col-1-4'>
            <FormControl label={getLang('YEAR')}>
              <Select className='text-primary'
                      defaultValue={defaultYear}
                      options={yearList}
                      ref='year'
                      onChange={this.onDateChange} />
            </FormControl>
          </div>
          <div className='col-1-4'>
            <FormControl label={getLang('MONTH')}>
              <Select className='text-primary'
                      defaultValue={defaultMonth}
                      options={monthList}
                      ref='month'
                      onChange={this.onDateChange} />
            </FormControl>
          </div>
          <div className='col-1-2' style={{ display: newAccountList.length > 1 ? 'block' : 'none' }} ref='accNameHolder'>
            <FormControl label='账套'>
              <Select className='text-primary'
                      options={newAccountList}
                      defaultValue={newAccountList[0] && newAccountList[0].value}
                      ref='accName' onChange={this.onAccChange} />
            </FormControl>
          </div>
        </div>

        <Loader status={status} className='side-gap gap-t pad-b' style={{minHeight: 0}}>
          {
            infoList.length && chartData.length
                ? <div className='gap-b'><Chart height='200' data={chartData}/></div>
                : null
          }

          {/*<div className='gap-t gap-b text-right'>
            {getLang('ACTUAL_SALARY') + getLang('COLON')}
            <span className='text-xl text-primary'>{total}</span>
          </div>*/}

          {
            infoList.length
              ? infoList.map((card, index) => {
                  return <InfoCard title={card.title} items={card.items} key={index} />;
                })
              : <p>{salaryCalendar.pointInfo}</p>
          }
        </Loader>

        <TopAction />
      </div>
    );
  }


  /**
   * Re-fetch salary info when year and month changes
   */
  onDateChange() {
    const accountList = this.getAccountList(
      this.state.salaryCalendar.payrollPeriodList,
      React.findDOMNode(this.refs.year).value,
      React.findDOMNode(this.refs.month).value
    );

    if (accountList.length > 1) {
      React.findDOMNode(this.refs.accNameHolder).style.display = 'block';

      dispatch({
        type: 'change-account-list',
        data: accountList
      });
    } else {
      React.findDOMNode(this.refs.accNameHolder).style.display = 'none';

      if (!accountList.length) {
        dispatch({
          type: 'get-salary-success',
          data: {
            infoList: []
          }
        });
      }
    }

    if (accountList[0]) {
      this.getSalary(accountList[0].value);
    }
  }


  /**
   * Account name changes
   */
  onAccChange(e) {
    this.getSalary(e.target.value);
  }


  /**
   * Get salary data
   */
  getSalary(accName) {
    SalaryDataUtils.getSalary({
      year: React.findDOMNode(this.refs.year).value,
      month: React.findDOMNode(this.refs.month).value,
      accName: accName
    });
  }


  /**
   * Get account list by year and month
   * @param data
   * @param year
   * @param month
   * @returns {*|Array.<T>}
   */
  getAccountList(data = [], year, month) {
    const accountList = data.filter((item) => {
      return (item.payPerYear === +year) && (item.payPerMon === +month);
    }).map((item) => {
      return {
        text: item.payAccName,
        value: item.payAccName
      };
    });

    if (accountList.length) {
      setTimeout(() => {
        if (!this.firstTime) {
          this.getSalary(accountList[0] && accountList[0].value);
          this.firstTime = true;
        }
      }, 0);
    }

    return accountList;
  }
}


export default Container.create(Salary);
