import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi, postApi } from "../helpers/fetcher";
import "../styles/ContentDetail.css";
import ReactPlayer from "react-player";
import { ThemeContext } from "../App";
import swal from "sweetalert";
import { setLocalCart } from "../helpers/local-service";

export default function ContentDetail() {
  const { id = 0 } = useParams();
  const [content, setContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const { cart, setCart } = useContext(ThemeContext);
  console.log({ cart, setCart });
  console.log({ showPreview });
  const getContent = async () => {
    try {
      let contentData = [];
      const apiResponse = await fetchApi(`/api/v1/contents/${id}`);
      console.log({ apiResponse });
      if (apiResponse.status == 200) {
        contentData = apiResponse.data.data;
      }
      setContent(contentData);
    } catch (exception) {
      console.error("error while fetching individual content", { exception });
    }
  };
  const reportContent = async (e) => {
    e.preventDefault();
    try {
      const reportData = {
        report: {
          content_id: content.id,
        },
      };
      const apiResponse = await postApi("/api/v1/report_contents", reportData);
      if (!apiResponse.data.success) {
        return swal(
          "Failed",
          "Failed to report content, please try again!",
          "error"
        );
      }
      return swal("Success", "Added to the cart successfully!", "success", {
        buttons: false,
        timer: 2000,
      });
    } catch (exception) {
      console.error("error while fetching individual content", { exception });
    }
  };
  const getUserCart = async () => {
    try {
      let cartData = [];
      const apiResponse = await fetchApi("/api/v1/cart_items");
      console.log({ apiResponse });
      if (apiResponse.status == 200) {
        cartData = apiResponse.data.data;
      }
      await setCart(cartData);
      await setLocalCart(cartData);
    } catch (exception) {
      console.error("error while fetching individual content", { exception });
    }
  };
  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const data = {
        cart: {
          content_id: content.id,
          sender_id: content.user.id,
        },
      };
      console.log({ data });
      const response = await postApi("/api/v1/cart_items", data);
      console.log("response", { response });
      if (!response.data.success) {
        return swal(
          "Failed",
          "Failed to add to cart, please try again!",
          "error"
        );
      }
      await getUserCart();
      return swal("Success", "Added to the cart successfully!", "success", {
        buttons: false,
        timer: 2000,
      });
    } catch (Exception) {
      console.error("exception while creating/adding cart", { Exception });
    }
  };
  const checkProductExistsInCart = () => {
    if (!cart || !content || !(cart instanceof Array)) return false;
    return cart.find((cartItem) => cartItem.content_id == content.id)
      ? true
      : false;
  };
  useEffect(() => {
    if (!id) return;
    getContent();
  }, [id]);
  console.log({ content });
  return (
    <div className="parent_div">
      <div className="first_half">
        <div className="media_block">
          <img src="/mp3-default.png" width={"100%"} height={"100%"} />
          {showPreview && (
            <ReactPlayer
              forceaudio={content?.content_type == "audio"}
              forcevideo={content?.content_type == "video"}
              url={`${process.env.REACT_APP_PUBLIC_URL}${content?.link}`}
              className="react-player"
              width="100%"
              height="100%"
              controls={true}
              playing={showPreview}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
              // light={
              //   content?.content_type == "audio" && !showPreview
              //     ? "/mp3-default.png"
              //     : "https://www.youtube.com/watch?v=ysz5S6PUM-U"
              // }
              // onClickPreview
            />
          )}
        </div>
      </div>
      <div className="second_half">
        <h1>{content?.title}</h1>
        <p>{content?.description}</p>
        <table>
          <tr>
            <td>
              <strong>Created By</strong>
            </td>
            <td>{content?.user.name}</td>
          </tr>
          <tr>
            <td>
              <strong>Published On</strong>
            </td>
            <td>{content?.created_at}</td>
          </tr>
          <tr>
            <td>
              <strong>Type</strong>
            </td>
            <td>{content?.content_type}</td>
          </tr>
        </table>
        <div className="preview-btns">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPreview(true);
            }}
          >
            See Preview
          </button>
          {!content?.is_owner && (
            <>
              {checkProductExistsInCart() ? null : (
                <button onClick={addToCart}>Add to Cart</button>
              )}
              <button onClick={reportContent}>Report Content</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
