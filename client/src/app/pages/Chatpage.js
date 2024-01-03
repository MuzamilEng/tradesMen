import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { useGlobalContext } from "../UserContext/UserContext";
import SideDrawer from "../Component/miscellaneous/SideDrawer";
import MyChats from "../Component/MyChats";
import Chatbox from "../Component/Chatbox";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useGlobalContext();

  return (
    <div style={{ width: "100%" }}>
       <SideDrawer />
      {/* {user && <SideDrawer />} */}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
