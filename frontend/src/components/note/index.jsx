import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { setCurrentNote } from "@app/slices/noteSlice";
import SunEditor from "suneditor-react";
import noteApi from "@api/note";
import nlpApi from "@api/nlp";
import toast from "@utils/toast";
import styles from "./styles.module.scss";
import { MagnifyingGlass } from "react-loader-spinner";

const buttonList = [
  ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
  ['bold', 'underline', 'italic', 'strike',],
  ['align'],
  ['fullScreen', 'showBlocks', 'codeView'],
  ['preview', 'print']
]

export default function NoteComponent() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const editor = useRef();

  const pages = useSelector((state) => state.pages);

  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState("");
  const [recommendList, setRecommendList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getNote = async () => {
    setIsLoading(true);
    try {
      const { data } = await noteApi.getNoteBySlug(slug);
      setNote(data.content);
      setIsLoading(false);
      dispatch(
        setCurrentNote({
          image: pages[data.page._id].image || "",
          path: `${pages[data.page._id].title} / ${data.title}`,
        })
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateNoteContent = async (content) => {
    await noteApi.updateNoteBySlug(slug, { content });
  };

  const handleNoteChange = (content) => {
    debounce(() => {
      setNote(content);
      updateNoteContent(content);
    }, 1000)();
  };

  const handlePredictNextWords = async (input) => {
    const text = input.split(" ");
    const word =
      text.length >= 3
        ? text.slice(-3).join(" ")
        : text.length >= 2
        ? text.slice(-2).join(" ")
        : text.join(" ");
    if (word.length > 0) {
      setIsFetching(true);
      const { data } = await nlpApi.getRecommendWords(word);
      setRecommendList(data);
      setIsFetching(false);
    }
  };

  const handleKeyDown = (event) => {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === "s") {
      event.preventDefault();
      toast.info("Saving...");
      updateNoteContent(editor.current.getContents());
    } else if ((event.ctrlKey || event.metaKey) && charCode === " ") {
      event.preventDefault();
      handlePredictNextWords(editor.current.getText());
    }
  };

  const handleAddRecommend = (word) => {
    setNote(editor.current.getText() + " " + word);
    handlePredictNextWords(editor.current.getText() + " " + word);
  };

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  useEffect(() => {
    getNote();
  }, [slug]);

  if (isLoading) return <></>;

  return (
    <div className={styles.container}>
      <SunEditor
        setOptions={{
          buttonList: buttonList,
        }}
        getSunEditorInstance={getSunEditorInstance}
        setContents={note}
        onChange={handleNoteChange}
        onKeyDown={handleKeyDown}
        placeholder="Please type here..."
        height="100%"
        setDefaultStyle="font-size: 16px;"
      />
      <div className={styles.recommendBlock}>
        <div className={styles.title}>Recommendation</div>
        {isFetching ? (
          <div className={styles.loadingBlock}>
            <MagnifyingGlass
              visible={isFetching}
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor="#F4442E"
              barColor="#51E5FF"
            />
          </div>
        ) : (
          <ul className={styles.recommendList}>
            {recommendList.map((item, index) => (
              <li
                key={index}
                className={styles.recommendItem}
                onClick={() => handleAddRecommend(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
