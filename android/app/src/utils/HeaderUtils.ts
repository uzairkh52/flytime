import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const ThreadWatcher = () => {
  const navigation = useNavigation();
  const threadUuid = useSelector((state: any) => state?.sendMessage?.threadUuid);
  console.log("threadUuid_test", threadUuid);
  

  console.log("navigation_0", navigation);
  const isuserLogin = useSelector(
    (state:any) => state?.login?.loginUser
  );
  console.log("isuserLogin2", isuserLogin);

  
  useEffect(()=> {
  if (isuserLogin?.status === 200) {
    navigation.navigate("Home");
  }
}, [isuserLogin, navigation]);

  useEffect(() => {
  if (threadUuid) {
    navigation.navigate("Chat");
  }
}, [threadUuid, navigation]);


  return null; // Does not render anything
};

export default ThreadWatcher;
