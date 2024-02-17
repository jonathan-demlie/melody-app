// Dropdown.tsx
import React from 'react';
import styled from "@emotion/styled";

interface StyledDropdownProps {
  isOpen: boolean;
}

interface DropdownItemProps {
  key: string;
}

interface DropdownProps {
  title: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  items: DropdownItemProps[];
}

const StyledDropdown = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  z-index: 1;
`;

const DropdownItem = styled.li`
  list-style-type: none;
  cursor: pointer;
`;

const DropdownHeader = styled.h3`
  cursor: pointer;
`;

const StatisticsDropdown: React.FC<DropdownProps> = ({
  title,
  isOpen,
  toggleDropdown,
  items,
}) => (
  <StyledDropdown>
    <DropdownHeader onClick={toggleDropdown}>{title}</DropdownHeader>
    {isOpen && (
      <DropdownContent>
        <ul>
          {items.map((item:any) => (
            <DropdownItem key={item.key}>{item}</DropdownItem>
          ))}
        </ul>
      </DropdownContent>
    )}
  </StyledDropdown>
);

export default StatisticsDropdown;
