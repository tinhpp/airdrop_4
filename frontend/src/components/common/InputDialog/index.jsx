import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Model,
  ModelHeading,
  ModelBody,
  ModelFooter,
  Input,
  Button,
} from "./InputDialog.styles";
import {
  addNote,
  editNote,
  removeNote,
  addPage,
  removePage,
  editPage,
} from "@app/slices/pageSlice";
import useOnClickOutSide from "@hooks/custom/useClickOutSide";
import { DIALOG_TYPE } from "@constants/enum";
import toast from "@utils/toast";
import pageApi from "@api/page";
import noteApi from "@api/note";

const InputDialog = ({ title, type, active, cancel, data, children }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState();

  if (!active) return <></>;

  const modelRef = useRef();
  useOnClickOutSide(modelRef, () => {
    cancel();
  });

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const renderButtonText = () => {
    switch (type) {
      case DIALOG_TYPE.RENAME_PAGE:
      case DIALOG_TYPE.RENAME_NOTE:
        return "Rename";
      case DIALOG_TYPE.REMOVE_PAGE:
      case DIALOG_TYPE.REMOVE_NOTE:
        return "Remove";
      case DIALOG_TYPE.ADD_NOTE:
      case DIALOG_TYPE.ADD_PAGE:
        return "Add";
      default:
        return;
    }
  };

  const handleRenamePage = async () => {
    try {
      await pageApi.updatePageById(data._id, { title: text });
      dispatch(editPage({ _id: data._id, title: text }));
      toast.success("Rename page successfully");
    } catch (error) {
      toast.error();
    }
  };

  const handleRemovePage = async () => {
    try {
      await pageApi.removePageById(data._id);
      dispatch(removePage(data._id));
      toast.success("Remove page successfully");
    } catch (error) {
      toast.error();
    }
  };

  const handleAddPage = async () => {
    try {
      const response = await pageApi.createPage({ title: text });
      dispatch(
        addPage({
          [response.data._id]: {
            ...response.data,
            isOpen: false,
            notes: [],
          },
        })
      );
      toast.success("Create page successfully");
    } catch (error) {
      toast.error();
    }
  };

  const handleRenameNote = async () => {
    try {
      const { data: newNote } = await noteApi.updateNoteBySlug(data._id, {
        title: text,
      });
      dispatch(editNote(newNote));
      toast.success("Rename note successfully");
    } catch (error) {
      toast.error();
    }
  };

  const handleRemoveNote = async () => {
    try {
      await noteApi.removeNoteBySlug(data._id);
      dispatch(removeNote({ page: data.page, slug: data._id }))
      toast.success("Remove note successfully");
    } catch (error) {
      toast.error();
    }
  };

  const handleAddNote = async () => {
    try {
      const { data: newNote } = await noteApi.createNote({
        title: text,
        content: "",
        page: data._id,
      });
      dispatch(addNote(newNote));
      toast.success("Create note successfully");
    } catch (error) {
      console.log("error", error);
      toast.error();
    }
  };

  const handleClick = () => {
    switch (type) {
      case DIALOG_TYPE.RENAME_PAGE:
        handleRenamePage();
        break;
      case DIALOG_TYPE.RENAME_NOTE:
        handleRenameNote();
        break;
      case DIALOG_TYPE.REMOVE_PAGE:
        handleRemovePage();
        break;
      case DIALOG_TYPE.REMOVE_NOTE:
        handleRemoveNote();
        break;
      case DIALOG_TYPE.ADD_NOTE:
        handleAddNote();
        break;
      case DIALOG_TYPE.ADD_PAGE:
        handleAddPage();
        break;
      default:
        break;
    }

    cancel();
  };

  useEffect(() => {
    setText(data.text);
  }, [data]);

  return (
    <Container>
      <Model ref={modelRef}>
        <ModelHeading
          dangerouslySetInnerHTML={{ __html: title }}
        ></ModelHeading>
        {type !== DIALOG_TYPE.REMOVE_PAGE && type !== DIALOG_TYPE.REMOVE_NOTE && (
          <ModelBody>
            <Input value={text} onChange={handleChangeText} />
          </ModelBody>
        )}
        <ModelFooter>
          <Button danger onClick={() => cancel()}>
            Cancel
          </Button>
          {renderButtonText() && (
            <Button primary onClick={handleClick}>
              {renderButtonText()}
            </Button>
          )}
        </ModelFooter>
      </Model>
    </Container>
  );
};

export default InputDialog;
