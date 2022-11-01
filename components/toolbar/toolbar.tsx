import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router";
import { Box } from "@mui/system";

import { Container } from "./toolbar.styles"
import { FormControl, IconButton, InputLabel, MenuItem } from '@mui/material'
import {Preview, Save, List, AccountTree, Settings} from '@mui/icons-material'
import { fetchBins } from "../../common/json-bin"
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Toolbar = ({onSaveClick, onPreviewClick, onSettingsClick, onListClick, onHierarchyClick, pages}) => {
    const router = useRouter();
    
    return (
        <Container>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="page-label">Page</InputLabel>
                    <Select    
                        labelId="page-label"
                        label="Page" value={router.query.id} fullWidth onChange={(event) => {
                        router.push(`/builder?id=${event.target.value}`)
                    }}  >  
                        {Array.isArray(pages) && pages.map((page) => (
                            <MenuItem  value={page.record}>{page.snippetMeta.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
             </Box>
            <IconButton onClick={onPreviewClick}><Preview/></IconButton>
            <IconButton onClick={onHierarchyClick}><AccountTree /></IconButton>
            <IconButton onClick={onListClick}><List /></IconButton>
            <IconButton onClick={onSettingsClick}><Settings /></IconButton>
            <IconButton onClick={onSaveClick}><Save/></IconButton>
        </Container>
    )
}

export {Toolbar}