import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useGetData from "../../../../custom-hooks/useGetData";
import { db } from "../../../../firebase.config";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

const TamanhoInput = ({ cor: color__id, type }) => {
  const { data: tamanhos, loading } = useGetData("tamanhos");
  const [tamanhosType, setTamanhosType] = useState([]);
  const [color, setColor] = useState(null);
  const [colorQnt, setColorQnt] = useState(0);
  const [estoque, setEstoque] = useState({});

  //   useEffect(() => {
  //     if (color) {
  //       let cor = [];
  //       tamanhosType?.tamanhos?.forEach((tamanho) => {
  //         cor[color?.name] =
  //           cor[color?.name] + { tamanho: tamanho, quantidade: 0 };
  //       });

  //       console.log("cor", cor);
  //     }
  //   }, [color, tamanhosType]);

  //   useEffect(() => {
  //     console.log("estoque", estoque);
  //   }, [estoque]);

  useEffect(() => {
    console.log("colorQnt", colorQnt);
  }, [colorQnt]);

  useEffect(() => {
    //     console.log("tamanhos", tamanhos);
    //     console.log("type", type);
    const tamanhosType = tamanhos.filter((item) => item.type === type);
    // console.log("tamanhosType", tamanhosType);
    setTamanhosType(tamanhosType[0]);

    const colorDocRef = doc(db, "colors", color__id);
    const getColor = async () => {
      const docColorSnap = await getDoc(colorDocRef);
      if (docColorSnap.exists()) {
        setColor(docColorSnap.data());
      } else {
        console.log("no color");
      }
    };

    getColor();
  }, [tamanhos]);

  return (
    <>
      {tamanhosType?.tamanhos &&
        tamanhosType?.tamanhos?.map((item, index) => {
          return (
            <Popover key={index}>
              <PopoverTrigger>
                <div
                  onClick={() => console.log("numero", item)}
                  className={`checkbox-group-tamanho`}
                  style={{
                    border: `1px solid ${color?.value}`,
                  }}
                >
                  <>
                    <span className="badgeIcon">
                      {colorQnt?.qnt ? colorQnt?.qnt : 0}
                    </span>
                    <p>{item}</p>
                  </>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>
                  Quantidade {color?.name} {item}
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <input
                    type="text"
                    placeholder="Quantidade"
                    value={colorQnt?.qnt}
                    onChange={(e) =>
                      setColorQnt([
                        {
                          cor: color?.name,
                          tamanho: item,
                          qnt: e.target.value,
                        },
                      ])
                    }
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          );
        })}
    </>
  );
};

export default TamanhoInput;
