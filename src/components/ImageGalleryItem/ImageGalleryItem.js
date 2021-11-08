function ImageGalleryItem({ arrImages, givLinkForModal }) {
  console.log(arrImages);
  return arrImages.map((obj) => {
    return (
      <li
        className="ImageGalleryItem"
        key={obj.id}
        id={obj.id}
        onClick={givLinkForModal}
      >
        <img className="ImageGalleryItem-image" src={obj.webformatURL} alt="" />
      </li>
    );
  });
}

export default ImageGalleryItem;
