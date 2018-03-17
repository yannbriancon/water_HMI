/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.centrale.anrec.manager;

import java.util.Collection;
import java.util.HashMap;
import org.centrale.anrec.items.Water;

/**
 *
 * @author yann
 */
public interface ItemManager {
    public Collection<Water> page();
    
    public Collection<Water> findByName(String name);
    
    public Collection<Water> findByWaterId(int waterId);
    
    public Collection<Water> findByDistinctCountry();
    
    public boolean getParameterValues(HashMap<String, String> parameters, HashMap<String, Integer> valid_parameters, HashMap<String, String> response);
        
    public Collection<Water> findByParameters(HashMap<String, String> parameters, HashMap<String, Integer> valid_parameters);
        
}
