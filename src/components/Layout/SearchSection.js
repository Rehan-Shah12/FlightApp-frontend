import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import "../../styles/SearchSection.css";
import { useDispatch, useSelector } from "react-redux";
import { searchFlights } from "../../store/thunks/flightThunk.js";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const pageNo = useSelector((state) => state.flight.pageNo)
  const pageSize = useSelector((state) => state.flight.pageSize)

  console.log("PAGE NO: ", pageNo)
  console.log("PAGE SIZE: ", pageSize)

  const [filters, setFilters] = useState({
    departureCity: "",
    arrivalCity: "",
    flightNumber: "",
  });

  const handleInputChange = (fieldName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([key, value]) => value !== "" && value !== undefined
      )
    );
  
    await navigate("/");
    dispatch(searchFlights(filteredFilters));
  };

  return (
    <div className="SearchSection">
      <div className="white-section-wrapper">
        <div className="white-section">
          <form>
            <div className="search-filters">
              <Space.Compact size="large">
                <Input
                  placeholder="Flying From (City)"
                  className="searchbar"
                  value={filters.departureCity}
                  onChange={(e) =>
                    handleInputChange("departureCity", e.target.value)
                  }
                />
                <Input
                  placeholder="Flying To (City)"
                  className="searchbar"
                  value={filters.arrivalCity}
                  onChange={(e) =>
                    handleInputChange("arrivalCity", e.target.value)
                  }
                />
                <Input
                  placeholder="Flight#"
                  className="searchbar"
                  value={filters.flightNumber}
                  onChange={(e) =>
                    handleInputChange("flightNumber", e.target.value)
                  }
                />
              </Space.Compact>
            </div>
            <div className="search-button">
              <Button
                type="primary"
                shape="round"
                size={"large"}
                onClick={handleSubmit}
              >
                <b>Search</b>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
