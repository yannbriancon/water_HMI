/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.centrale.anrec.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.centrale.anrec.Database;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author yann
 */
public class SpecController {
    public SpecController() {
    }

    @RequestMapping(method=RequestMethod.GET)
    public ModelAndView handleGet(HttpServletRequest request, 
            HttpServletResponse response) throws Exception{
        ModelAndView result = new ModelAndView("index");
        String name = request.getParameter("name");
        List<String> names = Database.getName(name);
        result.addObject("names", names);
        return result;
    }
}
