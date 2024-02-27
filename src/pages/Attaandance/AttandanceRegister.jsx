import React, { useEffect, useState } from "react";
import AttandanceCard from "../../component/AttandanceCard";
import BusyForm from "../../component/BusyForm";
import axios from "../../AxiosConfig";
import TitalBar from "../../component/TitalBar";
function AttandanceRegister() {
  const [data, setData] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const getData = async () => {
    setIsBusyShow(true);

    await axios
      .get(`/attendance/?att_date=2023-08-30`)

      .then((response) => {
        setData(response.data.results);
        console.log(response.data);
      })
      .catch(() => {
        setIsBusyShow(false);

        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const toggleShtype = (attid, atttype) => {
    console.log("shtype", attid, atttype);
  };

  const toggleFhtype = (attid, atttype) => {
    console.log("fhtype", attid, atttype);
  };
  return (
    <>
      <BusyForm isShow={isBusyShow} />
      <TitalBar
        addvisible={false}
        isVisible="YearSelector"
        title="Employee LIst of Year :"
        initialvalue={""}
        onRefresh={() => getData()}
      />
      <div className="grid-attandance">
        {data.map((item) => (
          <AttandanceCard
            key={item.att_id}
            fhtype={item.fhType.typ_id}
            shtype={item.shType.typ_id}
            supname={item.supid.sup_name}
            intime={item.intime}
            outtime={item.outtime}
            togglefhtype={() => toggleFhtype(item.att_id, item.fhType.typ_id)}
            toggleshtype={() => toggleShtype(item.att_id, item.shType.typ_id)}
          />
        ))}
      </div>
    </>
  );
}

export default AttandanceRegister;
