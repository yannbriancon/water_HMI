/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.centrale.anrec.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Collection;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.centrale.anrec.items.Water;
import org.centrale.anrec.manager.ItemManager;
import org.centrale.anrec.manager.ItemManagerImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author yann
 */
@Controller
public class PanelController {

    public PanelController() {
    }

    @RequestMapping(method=RequestMethod.GET)
    public ModelAndView handleGET(HttpServletRequest request, 
            HttpServletResponse response) throws Exception{
        ItemManager theItemManager = ItemManagerImpl.getInstance();
        ModelAndView result = new ModelAndView("panel");
        Collection<Water> list = theItemManager.page();
        Collection<Water> countries = theItemManager.findByDistinctCountry();
        
        String error = request.getParameter("error");
        if(error != null){
            if(error.matches("\\d{1}")){
                int error_val = Integer.parseInt(error);
                if(error_val == 1){
                    error = "La recherche faite n'est pas valide : ";
                }
                else if(error_val == 2){
                    error = "La recherche ci-dessous n'a retournée aucun résultat :";
                }
                else{
                    result.setViewName("redirect: panel.water");
                }
            }
        }
        else{
            error = null;
        }
        
        String json_choices = request.getParameter("choices");
        if(json_choices == null){
            json_choices = "null";
        }
        else{
            json_choices = URLDecoder.decode(json_choices, "UTF-8");
        }
        
        ObjectMapper mapper = new ObjectMapper();
        String json_list = "";
        String json_countries = "";
        String json_error = "";
	try {
		json_list = mapper.writeValueAsString(list);
                json_countries = mapper.writeValueAsString(countries);
                json_error = mapper.writeValueAsString(error);
	} catch (Exception e) {
		e.printStackTrace();
	}
        
        result.addObject("choices", json_choices);
        result.addObject("error", json_error);
        result.addObject("waters", json_list);
        result.addObject("countries", json_countries);
        return result;
    }
    
    @RequestMapping(method=RequestMethod.POST)
    public ModelAndView handlePOST(HttpServletRequest request, 
            HttpServletResponse response) throws Exception{
        ModelAndView result = new ModelAndView("redirect: panel.water");
        return result;
    }
    
}
