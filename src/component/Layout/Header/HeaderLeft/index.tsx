import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { mainStyle } from '../../../../assets/styles/component/mainStyle';


const HeaderLeftUser = () => {
const UserData = useSelector((state: RootState) => state?.login?.loginUser?.user);
    console.log("loginUserState000", UserData);
  return (
    <View>
      <Text>Hi, <Text style={mainStyle.Capitalize}>{UserData?.last_name}</Text></Text>
    </View>
  )
}

export default HeaderLeftUser;