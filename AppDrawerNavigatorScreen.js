import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './TabNavigator'
import  SettingScreen  from './SettingScreen'
import  ReciverScreen  from './reciverScreen'
import MyDonationScreen from './myDonationScreen';
import NotificationScreen from './notificationScreen';
import CustomSideBarMenu from '../../CustomSideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppTabNavigator
  },
  MyDonations : {
    screen : MyDonationScreen
  },

  Notification : {
    screen : NotificationScreen
  },
  Setting: {
    screen: SettingScreen   
  },
},
  {
    contentComponent: CustomSideBarMenu
  },
  {
    initialRouteName: 'Home'
  })
