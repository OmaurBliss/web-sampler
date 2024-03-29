import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { WaveSurfer, WaveForm, Region, Marker } from "wavesurfer-react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
// import axios from "axios";
// import WaveSurfer from "wavesurfer.js";
// import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


/**
 * @param min
 * @param max
 * @returns {*}
 */
function generateNum(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
  
  /**
   * @param distance
   * @param min
   * @param max
   * @returns {([*, *]|[*, *])|*[]}
   */
  function generateTwoNumsWithDistance(distance, min, max) {
    const num1 = generateNum(min, max);
    const num2 = generateNum(min, max);
    // if num2 - num1 < 10
    if (num2 - num1 >= 10) {
      return [num1, num2];
    }
    return generateTwoNumsWithDistance(distance, min, max);
  }

export default function EditModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const blobUrl = props.blobUrl || null;
  console.log(blobUrl);
  // Create an instance of WaveSurfer
//   const ws = WaveSurfer.create({
//     container: "body",
//     waveColor: "rgb(200, 0, 200)",
//     progressColor: "rgb(100, 0, 100)",
//     url: blobUrl,
//   });

const [timelineVis, setTimelineVis] = useState(false);
const [isLoaded, setIsLoaded] = useState(false);

const [markers, setMarkers] = useState([
  {
    time: 5.5,
    label: "V1",
    color: "#ff990a",
    draggable: true,
  },
  {
    time: 10,
    label: "V2",
    color: "#00ffcc",
    position: "top",
  },
]);

const plugins = useMemo(() => {
  return [
    {
      key: "regions",
      plugin: RegionsPlugin,
      options: { dragSelection: true },
    },
    timelineVis && {
      key: "top-timeline",
      plugin: TimelinePlugin,
      options: {
        height: 20,
        insertPosition: "beforebegin",
        style: {
          color: "#2D5B88",
        },
      },
    },
    timelineVis && {
      key: "bottom-timeline",
      plugin: TimelinePlugin,
      options: {
        height: 10,
        style: {
          color: "#6A3274",
        },
      },
    },
  ].filter(Boolean);
}, [timelineVis]);

const toggleTimeline = useCallback(() => {
  setTimelineVis(!timelineVis);
}, [timelineVis]);

const [regions, setRegions] = useState([
  {
    id: "region-1",
    start: 0.5,
    end: 10,
    color: "rgba(0, 0, 0, .5)",
    data: {
      systemRegionId: 31,
    },
  },
  {
    id: "region-2",
    start: 5,
    end: 25,
    color: "rgba(225, 195, 100, .5)",
    data: {
      systemRegionId: 32,
    },
  },
  {
    id: "region-3",
    start: 15,
    end: 35,
    color: "rgba(25, 95, 195, .5)",
    data: {
      systemRegionId: 33,
    },
  },
]);

// use regions ref to pass it inside useCallback
// so it will use always the most fresh version of regions list
const regionsRef = useRef(regions);

useEffect(() => {
  regionsRef.current = regions;
}, [regions]);

const regionCreatedHandler = useCallback(
  (region) => {
    console.log("region-created --> region:", region);

    if (region.data.systemRegionId) return;

    setRegions([
      ...regionsRef.current,
      { ...region, data: { ...region.data, systemRegionId: -1 } },
    ]);
  },
  [regionsRef],
);

const wavesurferRef = useRef();

const handleWSMount = useCallback(
  (waveSurfer) => {
    wavesurferRef.current = waveSurfer;

    if (wavesurferRef.current) {
      wavesurferRef.current.load(blobUrl);

      wavesurferRef.current.on("region-created", regionCreatedHandler);

      wavesurferRef.current.on("ready", () => {
        console.log("WaveSurfer is ready");
        setIsLoaded(true);
      });

      wavesurferRef.current.on("region-removed", (region) => {
        console.log("region-removed --> ", region);
      });

      wavesurferRef.current.on("loading", (data) => {
        console.log("loading --> ", data);
      });

      if (window) {
        window.surferidze = wavesurferRef.current;
      }
    }
  },
  [regionCreatedHandler],
);

const generateRegion = useCallback(() => {
  if (!wavesurferRef.current) return;
  const minTimestampInSeconds = 0;
  const maxTimestampInSeconds = wavesurferRef.current.getDuration();
  const distance = generateNum(0, 10);
  const [min, max] = generateTwoNumsWithDistance(
    distance,
    minTimestampInSeconds,
    maxTimestampInSeconds,
  );

  const r = generateNum(0, 255);
  const g = generateNum(0, 255);
  const b = generateNum(0, 255);

  setRegions([
    ...regions,
    {
      id: `custom-${generateNum(0, 9999)}`,
      start: min,
      end: max,
      color: `rgba(${r}, ${g}, ${b}, 0.5)`,
    },
  ]);
}, [regions, wavesurferRef]);
const generateMarker = useCallback(() => {
  if (!wavesurferRef.current) return;
  const minTimestampInSeconds = 0;
  const maxTimestampInSeconds = wavesurferRef.current.getDuration();
  const distance = generateNum(0, 10);
  const [min] = generateTwoNumsWithDistance(
    distance,
    minTimestampInSeconds,
    maxTimestampInSeconds,
  );

  const r = generateNum(0, 255);
  const g = generateNum(0, 255);
  const b = generateNum(0, 255);

  setMarkers([
    ...markers,
    {
      label: `custom-${generateNum(0, 9999)}`,
      time: min,
      color: `rgba(${r}, ${g}, ${b}, 0.5)`,
    },
  ]);
}, [markers, wavesurferRef]);

const removeLastRegion = useCallback(() => {
  let nextRegions = [...regions];

  nextRegions.pop();

  setRegions(nextRegions);
}, [regions]);
const removeLastMarker = useCallback(() => {
  let nextMarkers = [...markers];

  nextMarkers.pop();

  setMarkers(nextMarkers);
}, [markers]);

const shuffleLastMarker = useCallback(() => {
  setMarkers((prev) => {
    const next = [...prev];
    let lastIndex = next.length - 1;

    const minTimestampInSeconds = 0;
    const maxTimestampInSeconds = wavesurferRef.current.getDuration();
    const distance = generateNum(0, 10);
    const [min] = generateTwoNumsWithDistance(
      distance,
      minTimestampInSeconds,
      maxTimestampInSeconds,
    );

    next[lastIndex] = {
      ...next[lastIndex],
      time: min,
    };

    return next;
  });
}, []);

const play = useCallback(() => {
  wavesurferRef.current.playPause();
}, []);

const handleRegionUpdate = useCallback((region, smth) => {
  console.log("region-update-end --> region:", region);
  console.log(smth);
}, []);

const handleMarkerUpdate = useCallback((marker, smth) => {
  console.log("region-update-end --> marker:", marker);
  console.log(smth);
}, []);

const setZoom50 = () => {
  wavesurferRef.current.zoom(50);
};

  //   // Initialize the Regions plugin
  //   const wsRegions = ws.registerPlugin(RegionsPlugin.create());

  //   // Give regions a random color when they are created
  //   const random = (min, max) => Math.random() * (max - min) + min;
  //   const randomColor = () =>
  //     `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

  //   // Create some regions at specific time ranges
  //   ws.on("decode", () => {
  //     // Regions
  //     wsRegions.addRegion({
  //       start: 0,
  //       end: 8,
  //       content: "Resize me",
  //       color: randomColor(),
  //       drag: false,
  //       resize: true,
  //     });
  //     wsRegions.addRegion({
  //       start: 9,
  //       end: 10,
  //       content: "Cramped region",
  //       color: randomColor(),
  //       minLength: 1,
  //       maxLength: 10,
  //     });
  //     wsRegions.addRegion({
  //       start: 12,
  //       end: 17,
  //       content: "Drag me",
  //       color: randomColor(),
  //       resize: false,
  //     });

  //     // Markers (zero-length regions)
  //     wsRegions.addRegion({
  //       start: 19,
  //       content: "Marker",
  //       color: randomColor(),
  //     });
  //     wsRegions.addRegion({
  //       start: 20,
  //       content: "Second marker",
  //       color: randomColor(),
  //     });
  //   });

  //   wsRegions.enableDragSelection({
  //     color: "rgba(255, 0, 0, 0.1)",
  //   });

  //   wsRegions.on("region-updated", (region) => {
  //     console.log("Updated region", region);
  //   });

  //   // Loop a region on click
  //   let loop = true;
  //   // Toggle looping with a checkbox

  //   window.onload = function () {
  //     document.querySelector('input[type="checkbox"]').onclick = (e) => {
  //       loop = e.target.checked;
  //     };
  //   };

  //   {
  //     let activeRegion = null;
  //     wsRegions.on("region-in", (region) => {
  //       console.log("region-in", region);
  //       activeRegion = region;
  //     });
  //     wsRegions.on("region-out", (region) => {
  //       console.log("region-out", region);
  //       if (activeRegion === region) {
  //         if (loop) {
  //           region.play();
  //         } else {
  //           activeRegion = null;
  //         }
  //       }
  //     });
  //     wsRegions.on("region-clicked", (region, e) => {
  //       e.stopPropagation(); // prevent triggering a click on the waveform
  //       activeRegion = region;
  //       region.play();
  //       region.setOptions({ color: randomColor() });
  //     });
  //     // Reset the active region when the user clicks anywhere in the waveform
  //     ws.on("interaction", () => {
  //       activeRegion = null;
  //     });
  //   }

  //   // Update the zoom level on slider change
  //   ws.once("decode", () => {
  //     document.querySelector('input[type="range"]').oninput = (e) => {
  //       const minPxPerSec = Number(e.target.value);
  //       ws.zoom(minPxPerSec);
  //     };
  //   });

  return (
    <div>
      <Button onClick={handleOpen}>
        <EditIcon style={{ color: "black" }} />
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="App">
    <WaveSurfer
      plugins={plugins}
      onMount={handleWSMount}
      cursorColor="transparent"
      container="#waveform"
    >
      <WaveForm>
        {isLoaded &&
          regions.map((regionProps) => (
            <Region
              onUpdateEnd={handleRegionUpdate}
              key={regionProps.id}
              {...regionProps}
            />
          ))}
        {isLoaded &&
          markers.map((markerProps) => (
            <Marker
              onUpdateEnd={handleMarkerUpdate}
              start={markerProps.time}
              color={markerProps.color}
              content={markerProps.label}
              drag={markerProps.draggable}
            />
          ))}
      </WaveForm>
      <div id="timeline" />
    </WaveSurfer>
    <Box>
      <Button onClick={generateRegion}>Generate region</Button>
      <Button onClick={generateMarker}>Generte Marker</Button>
      <Button onClick={play}>Play / Pause</Button>
      <Button onClick={removeLastRegion}>Remove last region</Button>
      <Button onClick={removeLastMarker}>Remove last marker</Button>
      <Button onClick={shuffleLastMarker}>Shuffle last marker</Button>
      <Button onClick={toggleTimeline}>Toggle timeline</Button>
      <Button onClick={setZoom50}>zoom 50%</Button>
    </Box>
  </div>
        </Box>
      </Modal>
    </div>
  );
}
