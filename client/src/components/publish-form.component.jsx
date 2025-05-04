import { useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "src/service/api";
import AnimationWrapper from "../common/page-animation";
import { EditorContext } from "../pages/editor.pages.component";
import Tag from "./tags.component";

const PublishForm = () => {
  let navigate = useNavigate();
  let characterLimit = 200;
  let tagLimit = 10;
  const {
    blog,
    blog: { banner, title, tags, des, content },
    setEditorState,
    setBlog,
  } = useContext(EditorContext);

  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };

  const handleBlogDesChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value });
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };


const handleKeyDown = (e) => {
  if(e.keyCode == 13 || e.keyCode == 188){
    e.preventDefault()

    let tag = e.target.value;

    if(tags.length < tagLimit){
      if(!tags.includes(tag) && tag.length){
          setBlog({...blog, tags: [...tags, tag]})
      }
    } else{
      toast.error(`you can add max ${tagLimit} Tags`)
    }
    e.target.value = ""
  }
}




const publishBlog = async (e) => {
  e.preventDefault();

  if (e.target.className.includes("disable")) return;

  if (!title.length) return toast.error("Write Blog title before publishing");

  if (!des.length || des.length > characterLimit) {
    return toast.error(
      `Write the description within ${characterLimit} characters`
    );
  }

  if (!tags.length) {
    return toast.error("Enter at least one tag to help rank your blog");
  }

  const loadingToast = toast.loading("Publishing...");
  e.target.classList.add("disable");

  const blogData = {
    title,
    banner,
    des,
    content,
    tags,
    draft: false,
  };

  try {
    await API.createBlog(blogData);
    toast.dismiss(loadingToast);
    toast.success("Published 👍🏻");
    e.target.classList.remove("disable");

    setTimeout(() => navigate("/"), 500);
  } catch (err) {
    toast.dismiss(loadingToast);
    toast.error(err.message);
    e.target.classList.remove("disable");
  }
};


  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-br-cross"></i>
        </button>
        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded overflow-hidden bg-grey mt-4">
            <img src={banner} alt="banner"/>
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>
        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            defaultValue={title}
            className="input-box pl-4"
            style={{ backgroundColor: "rgb(225 222 222)" }}
            onChange={handleBlogTitleChange}
          />

          <p className="text-dark-grey mb-2 mt-9">
            Short Description about your blog
          </p>
          <textarea
            className="h-40 w-full resize-none leading-7 pl-4"
            maxLength={characterLimit}
            defaultValue={des}
            onChange={handleBlogDesChange}
            onKeyDown={handleTitleKeyDown}
            style={{ backgroundColor: "rgb(225 222 222)" }}
          ></textarea>
          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - des.length} characters left
          </p>

          <p className="text-dark-grey mb-2 mt-9">
            Topics - (Help in searching and ranking your blog post)
          </p>

          <div
            className="relative input-box pl-2 py-2 pb-4"
            style={{ backgroundColor: "rgb(225 222 222)" }}
          >
            <input
              type="text"
              placeholder="Topic"
              className="sticky input-box bg-white top-0  left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handleKeyDown}
            />
            {tags.map((tag, i) => {
             return <Tag tag={tag} tagIndex={i} key={i} />;
            })}
          </div>
          <p className="mt-1 mb-4 text-dark-grey text-right">{tagLimit - tags.length} Tags Left</p>

          <button className="btn-dark px-8" onClick={publishBlog}>Publish</button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
