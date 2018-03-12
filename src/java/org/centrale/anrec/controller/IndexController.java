/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.centrale.anrec.controller;

import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.centrale.anrec.Database;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author yann
 */
@Controller
public class IndexController {

    public IndexController() {
    }

    @RequestMapping(method=RequestMethod.GET)
    public ModelAndView handleGet(HttpServletRequest request, 
            HttpServletResponse response) throws Exception{
        ModelAndView result = new ModelAndView("index");
        List<String> names = Database.getAll();
        result.addObject("names", names);
        return result;
    }
}
