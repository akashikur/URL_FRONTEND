/* eslint-disable react-hooks/exhaustive-deps */
import { LinkIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrls } from "@/utiliti/urlFetch";
import Error from "./error";

const CreateLink = () => {
  const ref = useRef();

  const navigate = useNavigate();
  let [searchParam, setSearchParams] = useSearchParams();

  const longLink = searchParam.get("createNew");

  const { loading, error, data, fn: fnCreateUrl } = useFetch(createUrls);

  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long url is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (error == null && data) {
      navigate(`/link/${data._id}`);
    }
  }, [error, data]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blog = await new Promise((resolve) => canvas.toBlob(resolve));

      const file = new File([blog], "qr-code.png", { type: "image/png" });

      const formObj = new FormData();
      formObj.append("title", formValues.title);
      formObj.append("original_url", formValues.longUrl);
      formObj.append("custom_url", formValues.customUrl);
      formObj.append("qr", file);

      await fnCreateUrl(formObj);
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>
        {formValues?.longUrl && (
          <QRCode value={formValues.longUrl} size={250} ref={ref} />
        )}
        <Input
          id="title"
          placeholder="Short's link title"
          value={formValues.title}
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}

        <Input
          id="longUrl"
          placeholder="Enter your Long Url"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        {errors.longUrl && <Error message={errors.longUrl} />}

        <div className="flex items-center gap-2">
          <Card className="p-2">
            <LinkIcon />
          </Card>
          /
          <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>
        {error && <Error message={error.message} />}

        <DialogFooter className="sm:justify-start">
          <Button
            disabled={loading}
            type="submit"
            variant="destructive"
            onClick={createNewLink}
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
