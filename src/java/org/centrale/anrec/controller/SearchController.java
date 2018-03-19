/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.centrale.anrec.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URLEncoder;
import java.sql.ResultSet;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
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
public class SearchController {

    public SearchController() {
    }

    @RequestMapping(method=RequestMethod.GET)
    public ModelAndView handleGET(HttpServletRequest request, 
            HttpServletResponse response) throws Exception{
        ModelAndView result = new ModelAndView("redirect: panel.water");
        return result;
    }
    
    @RequestMapping(method=RequestMethod.POST)
    public ModelAndView handlePOST(HttpServletRequest request, 
            HttpServletResponse response) throws Exception{
        ItemManager theItemManager = ItemManagerImpl.getInstance();
        HashMap<String, String> parameters = SearchController.getParameters(request);
        HashMap<String, Integer> valid_parameters = new LinkedHashMap<>();
        HashMap<String, String> choices = new LinkedHashMap<>();
        boolean prevalid = SearchController.checkForm(parameters, valid_parameters);
        
        boolean valid = (theItemManager.getParameterValues(parameters, valid_parameters, choices) && prevalid);
        
        Collection<Water> list = null;
        if(valid && !(choices.isEmpty())){
            list = theItemManager.findByParameters(parameters, valid_parameters);
        }
        
        ModelAndView result = new ModelAndView();
        
        if(!valid){
            result.setViewName("redirect: panel.water");
            ObjectMapper mapper = new ObjectMapper();
            String json_choices = "";
            try {
                    json_choices = mapper.writeValueAsString(choices);
            } catch (Exception e) {
                    e.printStackTrace();
            }
            result.addObject("error", 1);
            result.addObject("choices", URLEncoder.encode(json_choices, "UTF-8"));
        } 
        else if(choices.isEmpty()){
            result.setViewName("redirect: panel.water");
        }
        else if(list.isEmpty()){
            result.setViewName("redirect: panel.water");
            ObjectMapper mapper = new ObjectMapper();
            String json_choices = "";
            try {
                    json_choices = mapper.writeValueAsString(choices);
            } catch (Exception e) {
                    e.printStackTrace();
            }
            result.addObject("error", 2);
            result.addObject("choices", URLEncoder.encode(json_choices, "UTF-8"));
        }
        else if(list.size()==1){
            Water w = (Water) list.toArray()[0];
            result.setViewName("redirect: spec.water?id=" + w.getWaterId());
        }
        else{
            result.setViewName("search");
            ObjectMapper mapper = new ObjectMapper();
            String json_list = "";
            String json_choices = "";
            try {
                    json_list = mapper.writeValueAsString(list);
                    json_choices = mapper.writeValueAsString(choices);
            } catch (Exception e) {
                    e.printStackTrace();
            }
            result.addObject("waters", json_list);
            result.addObject("choices", json_choices);
            result.addObject("name", request.getParameter("name"));
            result.addObject("country", request.getParameter("country"));
            result.addObject("component1_name", request.getParameter("component1_name"));
            result.addObject("component1_order", request.getParameter("component1_order"));
            result.addObject("component1_mass", request.getParameter("component1_mass"));
            result.addObject("component2_name", request.getParameter("component2_name"));
            result.addObject("component2_order", request.getParameter("component2_order"));
            result.addObject("component2_mass", request.getParameter("component2_mass"));
        }
        

        return result;
    }
    
    
    /**
     * 
     * @param request
     * @return 
     */
    private static LinkedHashMap<String, String> getParameters(HttpServletRequest request){
        LinkedHashMap<String, String> response = new LinkedHashMap<>();
        String name = request.getParameter("name");
        response.put("name", name);
        
        String country = request.getParameter("country");
        response.put("country", country);
        
        String component1_name = request.getParameter("component1_name");
        response.put("component1_name", component1_name);
        String component1_order = request.getParameter("component1_order");
        response.put("component1_order", component1_order);
        String component1_mass = request.getParameter("component1_mass");
        response.put("component1_mass", component1_mass);
        
        String component2_name = request.getParameter("component2_name");
        response.put("component2_name", component2_name);
        String component2_order = request.getParameter("component2_order");
        response.put("component2_order", component2_order);
        String component2_mass = request.getParameter("component2_mass");
        response.put("component2_mass", component2_mass);
        
        return response;
    } 
    
    /**
     * 
     * @param parameters
     * @return 
     */
    private static boolean checkForm(HashMap<String, String> parameters, HashMap<String, Integer> response){
        boolean form_valid = true;
        if((parameters.get("name")).equals("")){
            response.put("name", 0);
        }
        else{
            response.put("name", 1);
        }
        
        if(parameters.get("country").matches("\\d+")){
            response.put("country", 1);
        }
        else if (parameters.get("country").equals("-1")){
            response.put("country", 0);
        }
        else{
            response.put("country", -1);
            form_valid = false;
        }
        
        Boolean[] component1 = checkValidComponent(
                                    parameters.get("component1_name"),
                                    parameters.get("component1_order"),
                                    parameters.get("component1_mass"));
        if(!component1[0]){
            form_valid = false;
            response.put("component1", -1);
        }
        else{
            response.put("component1", (component1[1]) ? 1:0);            
        }
        
        Boolean[] component2 = checkValidComponent(
                                    parameters.get("component2_name"),
                                    parameters.get("component2_order"),
                                    parameters.get("component2_mass"));
        if(!component2[0]){
            form_valid = false;
            response.put("component2", -1);
        }
        else{
            response.put("component2", (component2[1]) ? 1:0);            
        }
        
        return form_valid;
    } 
    
    /**
     * 
     * @param component
     * @param component_order
     * @param component_mass
     * @return 
     */
    private static Boolean[] checkValidComponent(String component_name, String component_order, String component_mass){
        String[] l = {"Tous les minéraux", "Calcium", "Magnesium", "Sodium", "Potassium", "Sulfate", "Nitrate", "Bicarbonate", "Chlore"};
        
        // response = [champ valide, champ valide et utilisé]
        Boolean[] response = {true, true};
        if(!(component_order.equals("0") || component_order.equals("1"))){
            response[0] = false;
            response[1] = false;
        }
        else{
            if(!(component_name.matches("\\d+") || component_name.equals("-1"))){
                response[0] = false;
                response[1] = false;                
            }
            else{
                if(component_name.equals("-1")){
                    response[1] = false;
                }
                else if(Integer.parseInt(component_name)>=l.length){
                    response[0] = false;
                    response[1] = false;     
                }
                if(!(component_mass.matches("\\d+(\\.\\d+)*") || component_mass.equals(""))){
                    response[0] = false;
                    response[1] = false;
                }
                else if(component_mass.equals("")){
                    response[1] = false;
                }
            }
        }
        
        return response;
    } 
    
}

