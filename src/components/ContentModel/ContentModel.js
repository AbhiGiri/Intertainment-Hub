import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import Carousel from '../Carousel/Carousel';
import './ContentModel.css'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '70%',
  backgroundColor: "#39445a",
  // bgcolor: 'background.paper',
  border: "1px solid #282c34",
  color: "white",
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ children, id, media }) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState()
  const [video, setVideo] = React.useState()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  React.useEffect(() => {
    fetchData()
    fetchVideo()
  }, [])


  return (
    <>
      <div className="media" style={{ cursor: "pointer" }} color="inherit" onClick={handleOpen} >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={style}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
              <div className="ContentModal">
                <img src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape}
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}