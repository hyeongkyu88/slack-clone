import React, { useState } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  const [showLess, setShowLess] = useState(true);
  const [channelLess, setChannelLess] = useState(true);

  const toggleUpDownFunction = (e) => {
    setShowLess(!showLess);
  };
  const toggleUpDownChannels = (e) => {
    setChannelLess(!channelLess);
  };
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>테스트</h2>
          <h3>
            <FiberManualRecordIcon />
            정형규
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>
      <FunctionChannel onClick={toggleUpDownFunction}>
        {showLess && (
          <ExpandMoreIcon fontSize="small" style={{ padding: 10 }} />
        )}
        {!showLess && (
          <ChevronRightIcon fontSize="small" style={{ padding: 10 }} />
        )}
        <h3>Function</h3>
      </FunctionChannel>
      {showLess && (
        <ShowLessUpDown>
          <SidebarOption Icon={InsertCommentIcon} title="Threads" />
          <SidebarOption Icon={InboxIcon} title="Mention & reactions" />
          <SidebarOption Icon={DraftsIcon} title="Saved items" />
          <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
          <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
          <SidebarOption Icon={AppsIcon} title="Apps" />
          <SidebarOption Icon={FileCopyIcon} title="File browser" />
        </ShowLessUpDown>
      )}

      <hr />

      <FunctionChannel onClick={toggleUpDownChannels}>
        {channelLess && (
          <ExpandMoreIcon fontSize="small" style={{ padding: 10 }} />
        )}
        {!channelLess && (
          <ChevronRightIcon fontSize="small" style={{ padding: 10 }} />
        )}
        <h3>Channels</h3>
      </FunctionChannel>
      {channelLess && (
        <ChannelUpDown>
          {channels?.docs.map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
          ))}
        </ChannelUpDown>
      )}
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  hr {
    margin: 10px 0;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    font-size: 18px;
    color: #49274b;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
    > .MuiSvgIcon-root {
      margin-top: 1px;
      margin-right: 2px;
      font-size: 14px;
      color: green;
    }
  }
`;
const ShowLessUpDown = styled.div``;
const ChannelUpDown = styled.div``;
const FunctionChannel = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
  > h3 {
    font-weight: 500;
  }
  > h3 > span {
    padding: 15px;
  }
`;
