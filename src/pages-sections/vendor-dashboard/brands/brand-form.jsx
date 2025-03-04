import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";

// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";

// STYLED COMPONENTS
import { UploadImageBox, StyledClear } from "../styles";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!")
});

// ================================================================
// ================================================================
const BrandForm = props => {
  const {
    initialValues,
    handleFormSubmit
  } = props;
  const [files, setFiles] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = files => {
    files.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(files);
  };

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = file => () => {
    setFiles(files => files.filter(item => item.name !== file.name));
  };

  // HANDLE FORM SUBMIT WITH SNACKBAR
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await handleFormSubmit(values);
      setOpenSnackbar(true);
      resetForm();
      setFiles([]);
    } catch (error) {
      console.error('Error:', error);
      alert(`Unexpected error: ${error}`);
    }
    setSubmitting(false);
  };

  return <Card sx={{
    p: 6
  }}>
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={VALIDATION_SCHEMA}>
        {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth name="name" label="Name" color="info" size="medium" placeholder="Name" value={values.name} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
              </Grid>

              <Grid item xs={12}>
                <DropZone title="Drop & drag category image" onChange={files => handleChangeDropZone(files)} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                return <UploadImageBox key={index}>
                        <Box component="img" alt="product" src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>;
              })}
                </FlexBox>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControlLabel label="Featured Category" control={<Checkbox color="info" name="featured" onBlur={handleBlur} onChange={handleChange} value={values.featured} />} />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit" disabled={isSubmitting}>
                  Save category
                </Button>
              </Grid>
            </Grid>
          </form>}
      </Formik>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ marginLeft:'560px',marginBottom:'430px', width: '100%' }}>
          Brand saved successfully!
        </Alert>
      </Snackbar>
    </Card>;
};

export default BrandForm;