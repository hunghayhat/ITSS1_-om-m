import React, { useEffect, useState } from "react";
import { useData } from "../../context/AppContext";

import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import {
  Row,
  Col,
  Avatar,
  Modal,
  Select,
  Input,
  InputNumber,
  Form,
  message,
} from "antd";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { BACK_END_URL } from "../../context/const";
import "./congthuc.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

const { Option } = Select;
const { TextArea } = Input;

const EditRecipe = ({
  recipeId,
  material,
  fetchCongThucEdit,
  isOpen,
  isClose,
}) => {
  const { user, monDo, fetchMonDo } = useData();
  const [congThuc, setCongThuc] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [recipeDesc, setRecipeDesc] = useState("");
  const [materialsWithImages, setMaterialsWithImages] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingMaterial, setIsEditingMaterial] = useState(false);
  const handleIconNameClick = () => {
    setIsEditingName(!isEditingName);
  };

  const handleCancelNameClick = () => {
    setIsEditingName(false);
  };
  const handleIconDescClick = () => {
    setIsEditingDesc(!isEditingDesc);
  };

  const handleCancelDescClick = () => {
    setIsEditingDesc(false);
  };
  const handleIconMaterialClick = () => {
    setIsEditingMaterial(!isEditingMaterial);
  };

  const handleCancelMaterialClick = () => {
    setIsEditingMaterial(false);
  };
  const handleDelete = (id) => {
    alert("Xoa material co id: " + id)
  };
  const fetchCongThuc = (key) => {
    fetch(`${BACK_END_URL}recipe/material/${key}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipeName(data.recipeName);
        setRecipeDesc(data.recipeDesc);
        setMaterialsWithImages(data.materialsWithImages);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };
  useEffect(() => {
    console.log(material);
    fetchCongThuc(recipeId);
  }, [recipeId]);
  const handleSaveNameClick = async () => {
    try {
      const response = await fetch(`${BACK_END_URL}recipe/name/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName: recipeName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe name");
      }

      // Xử lý phản hồi thành công (nếu cần)
    } catch (error) {
      message.error(error.message);
    }

    setIsEditingName(false);
    fetchCongThuc(recipeId);
  };
  const handleSaveDescClick = async () => {
    try {
      const response = await fetch(`${BACK_END_URL}recipe/desc/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newDesc: recipeDesc,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe name");
      }

      // Xử lý phản hồi thành công (nếu cần)
    } catch (error) {
      message.error(error.message);
    }
    fetchCongThucEdit();
    setIsEditingDesc(false);
    fetchCongThuc(recipeId);
  };
  const handleClose = () => {
    isClose();
    fetchMonDo();
  };
  return (
    <div>
      <Dialog fullWidth sx={{ m: 1 }} open={isOpen} onClose={handleClose}>
        <div className="form-wrapper scroll">
          <DialogTitle
            style={{ display: "flex", alignItems: "center", padding: 0 }}
          >
            Sửa công thức món ăn
            <Button style={{ marginLeft: "auto", justifyContent: "flex-end" }}>
              <CloseIcon onClick={handleClose} />
            </Button>
          </DialogTitle>
          <div className="course-title">
            <div className="course-title-wrapper">
              <div className="course-title-header">
                <p>Recipe Name</p>
                {!isEditingName ? (
                  <div
                    onClick={handleIconNameClick}
                    className="course-title-action"
                  >
                    <EditIcon fontSize="small" />
                    <span>Edit Name</span>
                  </div>
                ) : (
                  <div
                    onClick={handleCancelNameClick}
                    className="course-title-action"
                  >
                    <span>Cancel</span>
                  </div>
                )}
              </div>
              <div className="course-title-body">
                {!isEditingName ? (
                  <div>{recipeName}</div>
                ) : (
                  <div className="grid">
                    <TextField
                      value={recipeName}
                      className="bg-main"
                      onChange={(e) => setRecipeName(e.target.value)}
                    />
                    <Button
                      sx={{ color: "white", backgroundColor: "black" }}
                      style={{
                        marginTop: "12px",
                        width: "max-content",
                      }}
                      variant="contained"
                      onClick={handleSaveNameClick}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="course-title">
            <div className="course-title-wrapper">
              <div className="course-title-header">
                <p>Recipe Desc</p>
                {!isEditingDesc ? (
                  <div
                    onClick={handleIconDescClick}
                    className="course-title-action"
                  >
                    <EditIcon fontSize="small" />
                    <span>Edit Desc</span>
                  </div>
                ) : (
                  <div
                    onClick={handleCancelDescClick}
                    className="course-title-action"
                  >
                    <span>Cancel</span>
                  </div>
                )}
              </div>
              <div className="course-title-body">
                {!isEditingDesc ? (
                  <div>{recipeDesc}</div>
                ) : (
                  <div className="grid">
                    <TextField
                      value={recipeDesc}
                      className="bg-main"
                      onChange={(e) => setRecipeDesc(e.target.value)}
                    />
                    <Button
                      sx={{ color: "white", backgroundColor: "black" }}
                      style={{
                        marginTop: "12px",
                        width: "max-content",
                      }}
                      variant="contained"
                      onClick={handleSaveDescClick}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="course-title">
            <div className="course-title-wrapper">
              <div className="course-title-header">
                <p>Recipe Material</p>
              </div>
              <div className="course-title-body">
                {material.map((item) => (
                  <div
                    key={item.id}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Avatar src={item.image} style={{ marginBottom: "10px" }} />
                    <span>{item.material}</span>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditRecipe;
