import Box from "@mui/material/Box";
export default function FlexRowCenter({
  children,
  ...props
}) {

(
  console.log("ippudu chudu ")
)
  return <Box display="flex" justifyContent="center" backdropFilter="blur(5px)" backgroundColor="rgba(200, 100, 400, 0.5)" alignItems="center" {...props} >
  {children}
</Box>
 

}